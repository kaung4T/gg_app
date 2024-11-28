import { http } from '@/utils/http';

export const GameBaccarat7M = {
    gameBaccarat7MOrderList: (data: {
      order_type?: string;
      date_from?: string;
      date_to?: string;
      page: number;
      pageSize: number;
    }) =>
      http.request<Baccarat7MAPI.OrderListRes>('post', '/v1/admin/baccarat7m/result_list', {
        data
      }),

    addGameBaccarat7M: (data: { page: number; pageSize: number }) =>
      http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/admin/baccarat7m/result_list', {
        data
    }),

    updateGameBaccarat7M: (data: { 
      id: string,
      member_id: null,
      banker: any,
      player: any,
      order_type: string
     }) =>
      http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/admin/baccarat7m/update', {
        data
    })
};
