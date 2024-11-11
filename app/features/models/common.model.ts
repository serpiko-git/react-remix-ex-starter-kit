import numeral from 'numeral';

export interface BaseResponse<T> {
  code: number;
  data: T;
  msg: string;
  time_now: string;
}

export interface BaseResponseList<T>
  extends BaseResponse<{
    catalog: { [key: string]: any };
    list: T[];
  }> {}

export interface BaseResponsePaging<T>
  extends BaseResponse<{
    catalog: {
      [key: string]: any;
    };
    pagination: {
      total: number;
      page_no: number;
      page_size: number;
    };
    list: T[];
  }> {}

const CATALOG_CASH = 'cash';
const CATALOG_TIME = 'time';

export function ParseCalaog<T>(catalog, list: T[]) {
  return list.map((item) => {
    const clone = { ...item };
    const fields = Object.keys(clone);

    fields.forEach((k) => {
      if (k in catalog) {
        const catalogItem = catalog[k];
        if (catalogItem === CATALOG_CASH) {
          clone[k] = numeral(clone[k]).format('0,0.00');
        } else if (catalogItem === CATALOG_TIME) {
          // nothing to do
        } else {
          // nothing to do
        }
      }
    });
    return clone;
  });
}
