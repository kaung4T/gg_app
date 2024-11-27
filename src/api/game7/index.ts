import { http } from '@/utils/http';

export const Game7 = {
    addGameVegasBaccarat: (data: { page: number; pageSize: number }) =>
      http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/admin/vegasbaccarat/result_list', {
        data
    }),

    updateGameVegasBaccarat: (data: { 
      id: string,
      member_id: null,
      banker: any,
      player: any,
      order_type: string
     }) =>
      http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/admin/vegasbaccarat/update', {
        data
    })
};
