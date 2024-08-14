
export interface BaseResponse<T> {
  code: number;
  data: T;
  msg: string;
  time_now: string;
}

export interface BaseResponseList<T> {
  code: number;
  data: {
    list: T[];
  }
  msg: string;
  time_now: string;
}

export interface BaseResponsePaging<T> {
  code: number;
  data: {
    pagination: {
      total: number;
      page_no: number;
      page_size: number;
    }
    list: T[];
  }
  msg: string;
  time_now: string;
}



