export interface Config {
  accountHost: string;
  apiHost_v1: string;
  apiGateway_v1: string;
  apiAccount_id: string;
  apiMatchingEngine_v1: string;
  apiMatchingRecon_v1: string;
  apiProxy_v1: string;
}

/** `'Timeout' 형식은 'number' 형식에 할당할 수 없습니다` 를 해결하기 위한 선언 */
export type SetTimeout = ReturnType<typeof window.setTimeout>;
export type SetInterval = ReturnType<typeof window.setInterval>;

/**
 * type Nullable
 * @description
 * - 모델의 모든 속성에 null이 가능하도록 확장이 가능한 제네릭 유틸함수
 * - 속성이 여러개 이더라도 한번에 적용 가능하다
 * @example
 * interface MyStrings {
 *   a: string;
 *   b: string;
 *   ...
 * }
 * type MyNullString = Nullable<MyStrings>; // string | null
 */
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
