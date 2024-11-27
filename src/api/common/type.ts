declare namespace COMMON {
  type ListData<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: {
      data: T;
      total: number;
      lastPage: number;
    };
  };

  type BASE_RES_TYPE<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
  };

  type ListFetchProps<T> = {
    pageSize: number;
    pageNum: number;
  };

  type FormProps<T = any> = {
    formInline: T;
  };
}
