import { ref } from 'vue';
import reDialog from './index.vue';
import { useTimeoutFn } from '@vueuse/core';
import { withInstall } from '@pureadmin/utils';
import type {
  EventType,
  ArgsType,
  DialogProps,
  ButtonProps,
  DialogOptions
} from './type';

const dialogStore = ref<Array<DialogOptions>>([]);

const addDialog = (options: DialogOptions) => {
  const open = () =>
    dialogStore.value.push(Object.assign(options, { visible: true }));
  if (options?.openDelay) {
    useTimeoutFn(() => {
      open();
    }, options.openDelay);
  } else {
    open();
  }
};

const closeDialog = (options: DialogOptions, index: number, args?: any) => {
  dialogStore.value[index].visible = false;
  options.closeCallBack && options.closeCallBack({ options, index, args });
  useTimeoutFn(() => {
    dialogStore.value.splice(index, 1);
  }, 200);
};

const updateDialog = (value: any, key = 'title', index = 0) => {
  dialogStore.value[index][key] = value;
};

const closeAllDialog = () => {
  dialogStore.value = [];
};

const ReDialog = withInstall(reDialog);

export type { EventType, ArgsType, DialogProps, ButtonProps, DialogOptions };
export {
  ReDialog,
  dialogStore,
  addDialog,
  closeDialog,
  updateDialog,
  closeAllDialog
};
