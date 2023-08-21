export type PaginationResponse<T> = {
  data: T;
  pagination: {
    pageCount: number;
    totalCount: number;
    pageSize: number;
  };
};

export type Response = {
  status: number;
  message: string;
  data?: any;
};
