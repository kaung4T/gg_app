import { http } from '@/utils/http';

export const User = {
  login: (data: { user_id: string; password: string }) =>
    http.request<UserAPI.Login_UserRes>('post', '/v1/login', { data }),

  userList: (data: { page: number; pageSize: number }) =>
    http.request<UserAPI.UserListRes>('post', '/v1/members/list', { data }),

  deleteUser: (data: { id: number }) =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/members/delete', {
      data
    }),

  addUser: (data: { user_id: string; name: string; password: string }) =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/members/create', {
      data
    })
};
