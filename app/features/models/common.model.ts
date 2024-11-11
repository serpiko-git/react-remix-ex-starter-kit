import numeral from 'numeral';

export interface BaseResponse<T> {
  code: number;
  data: T;
  msg: string;
  time_now: string;
}

export interface BaseResponseList<T> {
  code: number;
  data: {
    catalog?: {
      [key: string]: any;
    };
    list: T[];
  };
  msg: string;
  time_now: string;
}

export interface BaseResponsePaging<T> {
  code: number;
  data: {
    catalog?: {
      [key: string]: any;
    };
    pagination: {
      total: number;
      page_no: number;
      page_size: number;
    };
    list: T[];
  };
  msg: string;
  time_now: string;
}

const CATALOG_CASH = 'cash';
const CATALOG_QTY = 'qty';
const CATALOG_TIME = 'time';

export function ParseCatalog<T>(catalog, list: T[]) {
  return list.map((item) => {
    const clone = { ...item };
    const fields = Object.keys(clone);

    fields.forEach((k) => {
      if (k in catalog) {
        const catalogItem = catalog[k];
        if (catalogItem === CATALOG_CASH) {
          clone[k] = numeral(clone[k]).format('0,0.00');
        } else if (catalogItem === CATALOG_QTY) {
          clone[k] = numeral(clone[k]).format('0,0.000');
        } else if (catalogItem === CATALOG_TIME) {
          // UTC ISO-8601
          clone[k] = new Date(clone[k]).toISOString();
        } else {
          // nothing to do
        }
      }
    });
    return clone;
  });
}
