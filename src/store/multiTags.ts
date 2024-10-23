import { defineStore } from 'pinia';
import { store } from '@/store';
import { routerArrays } from '@/layout/types';
import { multiType, positionType } from './types';
import { responsiveStorageNameSpace } from '@/config';
import { isEqual, isBoolean, isUrl, storageLocal } from '@pureadmin/utils';

export const useMultiTagsStore = defineStore({
  id: 'pure-multiTags',
  state: () => ({
    multiTags: storageLocal().getItem<StorageConfigs>(
      `${responsiveStorageNameSpace()}configure`
    )?.multiTagsCache
      ? storageLocal().getItem<StorageConfigs>(
          `${responsiveStorageNameSpace()}tags`
        )
      : [...routerArrays],
    multiTagsCache: storageLocal().getItem<StorageConfigs>(
      `${responsiveStorageNameSpace()}configure`
    )?.multiTagsCache
  }),
  getters: {
    getMultiTagsCache(state) {
      return state.multiTagsCache;
    }
  },
  actions: {
    multiTagsCacheChange(multiTagsCache: boolean) {
      this.multiTagsCache = multiTagsCache;
      if (multiTagsCache) {
        storageLocal().setItem(
          `${responsiveStorageNameSpace()}tags`,
          this.multiTags
        );
      } else {
        storageLocal().removeItem(`${responsiveStorageNameSpace()}tags`);
      }
    },
    tagsCache(multiTags) {
      this.getMultiTagsCache &&
        storageLocal().setItem(
          `${responsiveStorageNameSpace()}tags`,
          multiTags
        );
    },
    handleTags<T>(
      mode: string,
      value?: T | multiType,
      position?: positionType
    ): T {
      switch (mode) {
        case 'equal':
          this.multiTags = value;
          this.tagsCache(this.multiTags);
          break;
        case 'push':
          {
            const tagVal = value as multiType;

            if (tagVal?.meta?.hiddenTag) return;

            if (isUrl(tagVal?.name)) return;

            if (tagVal?.meta?.title.length === 0) return;

            if (isBoolean(tagVal?.meta?.showLink) && !tagVal?.meta?.showLink)
              return;
            const tagPath = tagVal.path;

            const tagHasExits = this.multiTags.some(tag => {
              return tag.path === tagPath;
            });

            const tagQueryHasExits = this.multiTags.some(tag => {
              return isEqual(tag?.query, tagVal?.query);
            });

            const tagParamsHasExits = this.multiTags.some(tag => {
              return isEqual(tag?.params, tagVal?.params);
            });

            if (tagHasExits && tagQueryHasExits && tagParamsHasExits) return;

            const dynamicLevel = tagVal?.meta?.dynamicLevel ?? -1;
            if (dynamicLevel > 0) {
              if (
                this.multiTags.filter(e => e?.path === tagPath).length >=
                dynamicLevel
              ) {
                const index = this.multiTags.findIndex(
                  item => item?.path === tagPath
                );
                index !== -1 && this.multiTags.splice(index, 1);
              }
            }
            this.multiTags.push(value);
            this.tagsCache(this.multiTags);
          }
          break;
        case 'splice':
          if (!position) {
            const index = this.multiTags.findIndex(v => v.path === value);
            if (index === -1) return;
            this.multiTags.splice(index, 1);
          } else {
            this.multiTags.splice(position?.startIndex, position?.length);
          }
          this.tagsCache(this.multiTags);
          return this.multiTags;
        case 'slice':
          return this.multiTags.slice(-1);
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
});

export function useMultiTagsStoreHook() {
  return useMultiTagsStore(store);
}
