/* eslint-disable import/named */
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  isCancel,
} from 'axios';

import { accountHost, apiHost_v1 } from '~/consts';

import {
  BaseError,
  BaseResponse,
  CreateAxiosInstanceOptions,
  CustomAxiosInstance,
} from './apis.model';

let _timeDiff: number = 0;

let _accountId: string;
const injectAccountId = (id: string): void => {
  _accountId = id;
};

const injectServerTime = (response: BaseResponse): void => {
  _timeDiff = parseInt(response.time_now, 10) - Date.now();
};

const handleInterceptorRequest = (
  config: InternalAxiosRequestConfig,
  options?: CreateAxiosInstanceOptions,
): InternalAxiosRequestConfig => {
  const requestConfig = { ...config };

  /**
   * @property {object} withCredentials
   * @description Cross Origin에 브라우저의 인증 정보를 요청하기 위한 설정
   * - 이 옵션을 사용하는 요청에 대해서는 서버가 특정 도메인의 요청만 허용되도록 제한해야 한다
   * - 따라서 서버 응답의 헤더값이 Access-Control-Allow-Origin `*` 으로 설정 되어있는 경우 에러가 뜬다
   * - withCredentials 옵션이 활성된 상태에서는 `*` 사용을 허용하지 않기 때문이다
   * - 서버 측 Access-Control-Allow-Origin 에서 특정한 origin에 대한 허용 설정이 있어야 하며
   * - 서버 측에서 설정을 변경할 수 없거나 `*`으로 설정된 경우, withCredential 옵션을 제외하면 CORS 정책 위반을 피할 수 있다
   * @summary CORS에 쿠키 정보 전송
   */
  if (options?.useCredentials) {
    requestConfig.withCredentials = true;
  }

  if (options?.useAuthorization) {
    const token = '';
    const authorization = /^bearer/i.test(token) ? token : `bearer ${token}`;
    requestConfig.headers.Authorization = authorization;

    requestConfig.headers['X-PBAPI-TOKEN'] = token;

    requestConfig.headers['X-PBAPI-SIGN-TYPE'] = 1;
    requestConfig.headers['X-PBAPI-TIMESTAMP'] = Date.now() + _timeDiff;
    requestConfig.headers['X-PBAPI-RECV-WINDOW'] = '5000';
  }

  /** Dev Mode: Header에 accountId을 추가하면 사용자 인증을 할 수 있다 */
  if (options?.useDevMode) {
    requestConfig.headers['X-PBAPI-API-KEY'] = '1';
    /**
     * 5: 주문이 없어서 position_idx 변경 테스트가 가능
     */
    requestConfig.headers['X-PBAPI-ACCOUNT-ID'] = _accountId;
  }

  return requestConfig;
};

const handleInterceptorRequestError = (
  error: Error | AxiosError,
): Promise<AxiosError> => {
  console.log(error);
  return Promise.reject(error);
};

/**
 * @description
 * - HTTP status code 가 무조건 200 OK 를 수신함
 * - 따라서 data.code 가 0 보다 큰 경우, AxiosError를 throw 해줘야 함
 * @catution
 * - AxiosError 객체의 두번째 인자에서 code를 받고 있는데, number(0) 인 경우, 출력이 되지 않는 버그가 있으므로 문자열로 형변환하도록 한다
 */
const handleInterceptorResult = (
  response: AxiosResponse<BaseResponse | BaseError>,
): AxiosResponse<BaseResponse | BaseError> => {
  const { responseURL } = response.request;

  /**
   * 특정 API를 에러로 간주할 수 있도록 함
   * @example
   * const blackLists = ['/market/something', '/market/time'];
   */
  // eslint-disable-next-line prefer-const
  let blackLists: string[] = [];
  // blackLists.push('/market/something');
  // blackLists.push('position/set-preference');

  if (
    response.data?.code > 0 ||
    (blackLists.length && blackLists.some((url) => responseURL.includes(url)))
  ) {
    const message = response.data.msg;
    const code = response.data.code.toString();

    const axiosError: AxiosError = new AxiosError(
      message,
      code,
      response.config,
      response.request,
      response,
    );

    throw axiosError;
  }
  // 주의: return 형식 변경시 `CustomAxiosInstance`의 주석 참고
  return response;
};

const handleInterceptorResultError = (
  error: AxiosError | Error,
): Promise<AxiosError> => {
  if (isCancel(error)) {
    throw error;
  }
  return Promise.reject(error);
};

const setInterceptor = (
  axiosInstance: AxiosInstance,
  options?: CreateAxiosInstanceOptions,
): AxiosInstance => {
  const { interceptors } = axiosInstance;
  interceptors.request.use(
    (config) => handleInterceptorRequest(config, options),
    handleInterceptorRequestError,
  );
  interceptors.response.use(
    handleInterceptorResult,
    handleInterceptorResultError,
  );
  return axiosInstance;
};

const createAxiosInstance = (
  baseURL: string,
  options?: CreateAxiosInstanceOptions,
): AxiosInstance => {
  const axiosInstance: CustomAxiosInstance = axios.create({
    baseURL,
    responseType: 'json',
    timeout: 1000 * 5,
    ...axios.defaults.headers,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Credentials': 'true',
      ...(options?.requstConfig?.headers || {}),
    },
    ...options?.requstConfig,
  });

  return setInterceptor(axiosInstance, options);
};

const removeToken = ($axiosInstance: AxiosInstance): void => {
  const axiosInstance = $axiosInstance;
  delete axiosInstance.defaults.headers.common?.authorization;
};

/** 공개 api 객체 */
const api_v1 = createAxiosInstance(apiHost_v1);

/** 인증 api 객체 */
const apiAuth_v1 = createAxiosInstance(apiHost_v1, {
  useAuthorization: true,
  useDevMode: true,
});

/** 다른도메인에 쿠키를 포함하여 전송하는 api 객체 */
const apiWithCredentials = createAxiosInstance(accountHost, {
  useCredentials: true,
  useAuthorization: true,
  useDevMode: true,
});

export {
  api_v1,
  apiAuth_v1,
  apiWithCredentials,
  removeToken,
  injectServerTime,
  injectAccountId,
  _accountId,
};
