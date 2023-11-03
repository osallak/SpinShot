export type PaginationResponse<T> = {
  data: T;
  pagination: {
    pageCount: number;
    totalCount: number;
    pageSize: number;
  };
  wins ?: number;
  loses ?: number;
};

export class Response {
  status: number;
  message: string;
  data?: any;
}

// this is for bigInt because it cannot be serialized
export function toObject() {
  return JSON.parse(
    JSON.stringify(
      this,
      (_, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    ),
  );
}
