declare namespace GAME7API {
    type ORDER = {
        id: string,
        round_id: string,
        member_id: null,
        banker: any,
        player: any,
        order_type: string
    };
  
    type ORDERRes = COMMON.BASE_RES_TYPE<ORDER>;
    type OrderListRes = COMMON.ListData<ORDER[]>;
  }
  