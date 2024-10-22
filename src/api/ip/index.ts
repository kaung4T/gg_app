import { http } from '@/utils/http';

export const IP = {
  ipList: (data: { page: number; pageSize: number }) =>
    http.request<IPAPI.IPListRes>('post', '/v1/ip/list', { data }),

  deleteIP: (data: { id: number }) =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/ip/delete', {
      data
    }),

  updateIp: (data: { ip: string; name: string; is_block: string }) =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/ip/update', {
      data
    }),

  addIp: (data: { ip: string; name: string; is_block: string }) =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/ip/create', {
      data
    }),

  updateRateLimit: (data: { rate_limit: boolean }) =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/rate_limit/update', {
      data
    }),

  rateLimit: () =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/rate_limit')
};
