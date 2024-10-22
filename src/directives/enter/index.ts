import { useEventListener } from '@vueuse/core';
import type { Directive, DirectiveBinding } from 'vue';

export const enter: Directive = {
  mounted(el: HTMLInputElement, binding: DirectiveBinding) {
    useEventListener(el, 'keyup', e => {
      if (e.key === 'Enter') binding.value();
    });
  }
};
