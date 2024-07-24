/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    /** flag for local dev mode */
    REACT_APP_USE_DEV_MODE: 'true' | 'false';
    REACT_APP_JWT_TOKEN_DEBUG: string;
    /** fixed hosts */
    REACT_APP_LANDING_HOST: string;
    REACT_APP_STATIC_HOST: string;
    REACT_APP_ACCOUNT_HOST: string;
    REACT_APP_PNL_HOST: string;
    /** version list */
    REACT_APP_API_HOST_V1: string;
    REACT_APP_PUBLIC_WEBSOCKET_HOST_V1: string;
    REACT_APP_PRIVATE_WEBSOCKET_HOST_V1: string;
  }
}
