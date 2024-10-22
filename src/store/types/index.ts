import { RouteRecordName } from 'vue-router';

export type cacheType = {
  mode: string;
  name?: RouteRecordName;
};

export type multiType = {
  path: string;
  name: string;
  meta: any;
  query?: object;
  params?: object;
};

export type setType = {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
};

export type appType = {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;

    isClickCollapse: boolean;
  };
  layout: string;
  device: string;
};

export type userType = {
  roles?: Array<string>;
  verifyCode?: string;
  currentPage?: number;
  token: string;
  userInfo: any;
};

export type positionType = {
  startIndex?: number;
  length?: number;
};

export type CommonType = {
  inputLanType: 'ko' | 'en';
};
