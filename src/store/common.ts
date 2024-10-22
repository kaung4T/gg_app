import { defineStore } from 'pinia';
import { CommonType } from './types';

export const useCommonStore = defineStore('COMMONSTORE', {
  state: (): CommonType => ({
    inputLanType: 'ko'
  }),
  actions: {
    set_input_lan_type(_: 'ko' | 'en') {
      this.inputLanType = _;
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: [] }]
  }
});
