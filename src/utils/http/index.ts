import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CustomParamsSerializer
} from 'axios';
import {
  PureHttpError,
  RequestMethods,
  PureHttpResponse,
  PureHttpRequestConfig
} from './types.d';
import { stringify } from 'qs';
import NProgress from '../progress';
import { TokenKey } from '@/utils/auth';
import { storageSession } from '@pureadmin/utils';
import { useUserStore } from '@/store/user';

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 20000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    // "Content-Type": "application/json",
    'X-Requested-With': 'XMLHttpRequest'
  },
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
};

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  private static initConfig: PureHttpRequestConfig = {};

  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config: PureHttpRequestConfig): Promise<any> => {
        NProgress.start();

        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config);
          return config;
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback(config);
          return config;
        }

        const whiteList = ['/refreshToken', '/login'];
        if (whiteList.some(_ => config.url.indexOf(_) < 0)) {
          const token: string = storageSession().getItem(TokenKey) ?? '';
          if (token) {
            config.headers['authorization'] = `Bearer ` + token;
          }
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  /** responseInterception */
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: PureHttpResponse) => {
        const $config = response.config;

        NProgress.done();

        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (PureHttp.initConfig.beforeResponseCallback) {
          PureHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        return response.data;
      },
      (error: PureHttpError) => {
        switch (error.response.status) {
          case 403:
            useUserStore().logOut();
            break;
        }
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);

        NProgress.done();
        return Promise.reject($error);
      }
    );
  }

  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as PureHttpRequestConfig;

    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: PureHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('post', url, params, config);
  }

  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: PureHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('get', url, params, config);
  }
}

export const http = new PureHttp();
