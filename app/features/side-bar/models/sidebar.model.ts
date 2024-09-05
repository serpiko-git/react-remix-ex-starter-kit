import { DEFAULT_DASHBOARD_PATH } from '~/consts';

export type DashboardPathNavigateTypes =
  (typeof DEFAULT_DASHBOARD_PATH)[keyof typeof DEFAULT_DASHBOARD_PATH];
