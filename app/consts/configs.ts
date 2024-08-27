import type { Config } from '../types/type';

/** * @constant {Config} */
export const configs: Config = {
  // accountHost: import.meta.env.VITE_REACT_APP_API_HOST_V1,
  // apiHost_v1: import.meta.env.VITE_REACT_APP_API_HOST_V1,
  accountHost: process.env.REACT_APP_API_HOST_V1,
  apiHost_v1: process.env.REACT_APP_API_HOST_V1,
  apiAdminHost_v1: process.env.REACT_APP_API_ADMIN_HOST_V1,
  apiAccount_id: process.env.REACT_APP_API_ACCOUNT_ID,
};

/** @constant {boolean} */
export const USE_DEV_MODE: boolean =
  process.env.REACT_APP_USE_DEV_MODE === 'true';

export const { apiHost_v1, apiAdminHost_v1, accountHost, apiAccount_id } = configs;
