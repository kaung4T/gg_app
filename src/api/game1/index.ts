import { http } from '@/utils/http';

export const Game1 = {
  generateOrder: () =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/generate_order'),

  game1OrderList: (data: { page: number; pageSize: number }) =>
    http.request<GAME1API.OrderListRes>('post', '/v1/order_history', { data }),

  game1ShowedOrderList: (data: { page: number; pageSize: number }) =>
    http.request<GAME1API.OrderListRes>('post', '/v1/is_showed_order_history', {
      data
    }),

  updateOrder: (data: { id: number; meal: string; meal_type: string }) =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/manual_order/update', {
      data
    })
};
