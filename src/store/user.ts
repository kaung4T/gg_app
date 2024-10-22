import { defineStore } from 'pinia';
import { store } from '@/store';
import { userType } from './types';
import { routerArrays } from '@/layout/types';
import { resetRouter } from '@/router';
import { storageSession } from '@pureadmin/utils';
import { useMultiTagsStoreHook } from '@/store/multiTags';
import { removeStorage, sessionKey, TokenKey } from '@/utils/auth';

export const useUserStore = defineStore('USERSTATE', {
  state: (): userType => ({
    roles: [],
    userInfo: {} as any,
    token: ''
  }),
  actions: {
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    async loginByUsername(_data) {},
    logOut() {
      removeStorage();

      resetRouter();
      this.userInfo = {};
      window.location.reload();
    },
    async signOut() {},
    setUserInfo(_: UserAPI.Login_User) {
      this.userInfo = Object.assign(this.userInfo, _);
      this.token = _.access_token;
      storageSession().setItem(sessionKey, this.userInfo);
      storageSession().setItem(TokenKey, this.token);
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
