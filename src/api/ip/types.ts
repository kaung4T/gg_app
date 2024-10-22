declare namespace IPAPI {
  type IP = {
    id: number;
    ip: string;
    name: string;
    is_block: string;
    created_at: string;
  };

  type IPRes = COMMON.BASE_RES_TYPE<IP>;
  type IPListRes = COMMON.ListData<IP[]>;
}
