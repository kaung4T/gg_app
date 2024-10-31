import { message } from '@/utils/message';
import { copyTextToClipboard } from '@pureadmin/utils';

export const useCopyHook = () => {
  function copyText(str: string | number, tip: string) {
    if (!str) return;
    const success = copyTextToClipboard(str.toString());

    success
      ? message(t('', { value: tip || str || '' }), {
          type: 'success'
        })
      : message(t(''), { type: 'error' });
  }
  return {
    copyText
  };
};
