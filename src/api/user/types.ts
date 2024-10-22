declare namespace UserAPI {
  type Login_User = {
    access_token: string;
    created_at: string;
    updated_at: string;
    id: number;
    user_id: string;
    name: string;
    updatedAt: string;
    createdAt: string;
  };

  type UserList = {
    id: number;
    user_id: string;
    name: string;
    created_at: string;
  };

  type Login_UserRes = COMMON.BASE_RES_TYPE<Login_User>;
  type UserListRes = COMMON.ListData<UserList[]>;
}
