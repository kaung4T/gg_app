import Cookies from 'js-cookie';
import { storageSession } from '@pureadmin/utils';

export interface DataInfo<T> {
  email: string;
  id: number;
  password: any;
  roles?: Array<T>;
}

export const sessionKey = 'user-info';
export const TokenKey = 'authorized-token';

export function getToken(): DataInfo<number> {
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageSession().getItem(sessionKey);
}
export function removeStorage() {
  localStorage.clear();
  sessionStorage.clear();
}

export const formatToken = (token: string): string => {
  return 'Bearer ' + token;
};
