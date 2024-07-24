import type { Config } from '../types/type';

/** * @constant {Config} */
export const configs: Config = {
  /** flag for local dev mode */
  jwtTokenDebug: process.env.REACT_APP_JWT_TOKEN_DEBUG,
  /** fixed hosts */
  landingHost: process.env.REACT_APP_LANDING_HOST,
  staticHost: process.env.REACT_APP_STATIC_HOST,
  accountHost: process.env.REACT_APP_ACCOUNT_HOST,
  pnlHost: process.env.REACT_APP_PNL_HOST,
  /** version list */
  apiHost_v1: process.env.REACT_APP_API_HOST_V1,
  wsPublicHost_v1:
    process.env.REACT_APP_PUBLIC_WEBSOCKET_HOST_V1 || 'ws://localhost:8080',
  wsPrivateHost_v1:
    process.env.REACT_APP_PRIVATE_WEBSOCKET_HOST_V1 || 'ws://localhost:8080',
};

/** @constant {boolean} */
export const USE_DEV_MODE: boolean =
  process.env.REACT_APP_USE_DEV_MODE === 'true';

export const {
  jwtTokenDebug,
  landingHost,
  staticHost,
  accountHost,
  pnlHost,
  apiHost_v1,
  wsPublicHost_v1,
  wsPrivateHost_v1,
} = configs;
