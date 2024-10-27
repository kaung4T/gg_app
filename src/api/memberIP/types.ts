declare namespace MemberIPAPI {
  type IP = {
    id: number;
    ip: string;
    created_at: string;
  };

  type MemberIPRes = COMMON.BASE_RES_TYPE<MemberIPAPI>;
  type MemberIPListRes = COMMON.ListData<MemberIPAPI[]>;
}
