import { storageLocal } from '@pureadmin/utils';

interface Obj {
  [key: string]: any;
}

interface ILocaleType {
  locale: 'ko' | 'en';
}

export const removeEmptyStringKeys = (obj: Obj): Obj => {
  return Object.entries(obj).reduce((newObj: Obj, [key, value]) => {
    if (value !== '' && value !== ' ') {
      newObj[key] = value;
    }
    return newObj;
  }, {});
};

export const getLan = (): 'ko' | 'en' => {
  const lan =
    (storageLocal().getItem('responsive-locale') as ILocaleType)?.locale ??
    'ko';
  return lan;
};

export const useCurrentLan = (ko: string, en?: string | null) => {
  return getLan() == 'ko' ? ko : en;
};
