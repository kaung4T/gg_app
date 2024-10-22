import { message } from '@/utils/message';
import { useEventListener } from '@vueuse/core';
import { copyTextToClipboard } from '@pureadmin/utils';
import type { Directive, DirectiveBinding } from 'vue';

interface CopyEl extends HTMLElement {
  copyValue: string;
}

export const copy: Directive = {
  mounted(el: CopyEl, binding: DirectiveBinding) {
    const { value } = binding;
    if (value) {
      el.copyValue = value;
      const arg = binding.arg ?? 'dblclick';

      useEventListener(el, arg, () => {
        const success = copyTextToClipboard(el.copyValue);
        success
          ? message('Copied', { type: 'success' })
          : message('Failed', { type: 'error' });
      });
    } else {
      throw new Error(
        '[Directive: copy]: need value! Like v-copy="modelValue"'
      );
    }
  },
  updated(el: CopyEl, binding: DirectiveBinding) {
    el.copyValue = binding.value;
  }
};
