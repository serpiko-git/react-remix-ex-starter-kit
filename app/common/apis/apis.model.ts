/* eslint-disable import/named */
import { AxiosInstance, AxiosRequestConfig } from 'axios';
export interface BaseResponse<ResponseDataType = unknown> {
  /** response code */
  code: number;
  /** api response data */
  data: ResponseDataType;
  /** code와 1:1 매칭되는 상황별 에러 메시지 */
  msg: string;
  /** timestamp */
  time_now: string;
}

export type BaseError = Omit<BaseResponse, 'data'>;

/**
 * axios instance 생성 시 interceptor에서 리턴 값을 수정하는 경우 axios에서 타입 추론이 되지 않기 때문에 수동으로 바로잡아야 함.
 */
export interface CustomAxiosInstance extends AxiosInstance {
  request<T, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
  get<T>(...params: Parameters<AxiosInstance['get']>): Promise<T>;
  delete<T>(...params: Parameters<AxiosInstance['delete']>): Promise<T>;
  head<T>(...params: Parameters<AxiosInstance['head']>): Promise<T>;
  options<T>(...params: Parameters<AxiosInstance['options']>): Promise<T>;
  post<T>(...params: Parameters<AxiosInstance['post']>): Promise<T>;
  put<T>(...params: Parameters<AxiosInstance['put']>): Promise<T>;
  patch<T>(...params: Parameters<AxiosInstance['patch']>): Promise<T>;
  postForm<T>(...params: Parameters<AxiosInstance['postForm']>): Promise<T>;
  putForm<T>(...params: Parameters<AxiosInstance['putForm']>): Promise<T>;
  patchForm<T>(...params: Parameters<AxiosInstance['patchForm']>): Promise<T>;
}

export type CreateAxiosInstanceOptions = {
  requstConfig?: AxiosRequestConfig;
  useCredentials?: boolean;
  useAuthorization?: boolean;
  useDevMode?: boolean;
  name?: any;
};
