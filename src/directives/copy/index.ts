import { message } from '@/utils/message';
import { useClipboard, useEventListener } from '@vueuse/core';
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

      useEventListener(el, arg, (e: any) => {
        e.stopPropagation();
        const { copy } = useClipboard({ source: value.val, legacy: true });
        copy(value.val);
        message(value?.tip ? value.tip : 'Copied', { type: 'success' });
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
