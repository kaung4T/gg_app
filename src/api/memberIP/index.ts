import { http } from '@/utils/http';

export const MemberIP = {
  memberIpList: (data: { page: number; pageSize: number }) =>
    http.request<MemberIPAPI.MemberIPListRes>('post', '/v1/member_ip/list', {
      data
    }),

  deleteMemberIP: (data: { id: number }) =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/member_ip/delete', {
      data
    }),

  addMemberIp: (data: { ip: string }) =>
    http.request<COMMON.BASE_RES_TYPE<any>>('post', '/v1/member_ip/create', {
      data
    })
};
