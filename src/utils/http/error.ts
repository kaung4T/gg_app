import { message } from '../message';
import { PureHttpError } from './types';

export const error404 = (error: PureHttpError) => {
  return message(
    `
        <div class="flex flex-col justify-center" >
            <span class-"mb-2" >${t('API not found')}</span>
            <span>${t('API')}:${error.config?.url}</span>
        </div>
    `,
    {
      duration: 3000,
      dangerouslyUseHTMLString: true,
      type: 'error'
    }
  );
};
