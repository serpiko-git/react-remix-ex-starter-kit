

export interface BaseResponseList<T> {
  code: number;
  data: T[];
  msg: string;
  time_now: string;
}

export interface BaseResponse<T> {
  code: number;
  data: T;
  msg: string;
  time_now: string;
}

export interface BaseResponseListPaging<T> {
  code: number;
  data: {
    total: string;
    items: T[];
  }
  msg: string;
  time_now: string;
}

