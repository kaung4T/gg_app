declare namespace GAME1API {
  type ORDER = {
    id: number;
    member: any;
    serial_number: string;
    meal: string;
    meal_type: string;
    order_type: string;
    is_showed: string;
    created_at: string;
    updated_at: string;
  };

  type ORDERRes = COMMON.BASE_RES_TYPE<ORDER>;
  type OrderListRes = COMMON.ListData<ORDER[]>;
}
