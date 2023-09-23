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

// this is for bigInt because it cannot be serialized
export function toObject() {
  return JSON.parse(
    JSON.stringify(
      this,
      (_, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    ),
  );
}
