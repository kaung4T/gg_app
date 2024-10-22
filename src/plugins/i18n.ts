import { App } from 'vue';
import { type I18n, createI18n } from 'vue-i18n';

import enLocale from 'element-plus/dist/locale/en.mjs';
import koLocale from 'element-plus/dist/locale/ko.mjs';
import { CRC32 as crc32 } from 'crc_32_ts';

function siphonI18n(prefix = 'ko') {
  return Object.fromEntries(
    Object.entries(
      import.meta.glob('../../locales/json/*.json', { eager: true })
    ).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  )[prefix];
}

export const localesConfigs = {
  ko: {
    ...siphonI18n('ko'),
    ...koLocale
  },
  en: {
    ...siphonI18n('en'),
    ...enLocale
  }
};

export function t(message: any = '', params: any = {}) {
  if (!message) return '';
  let hashKey = `k${crc32.str(message).toString(16)}`;
  if (params.context) hashKey = `${hashKey}_${params.context}`;
  let words = i18n.global.t.call(i18n.global.locale, hashKey, params);
  if (words === hashKey) {
    words = message;
  }
  return words;
}

export const i18n: I18n = createI18n({
  legacy: false,
  locale:
    JSON.parse(localStorage.getItem('responsive-locale') ?? '{}').locale ??
    'ko',
  fallbackLocale: 'en',
  messages: localesConfigs
});

export function useI18n(app: App) {
  app.use(i18n);
}
