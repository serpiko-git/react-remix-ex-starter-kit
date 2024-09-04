import { DEFAULT_PATH_NAVIGATE } from '~/consts';

export type PathNavigateTypes =
  (typeof DEFAULT_PATH_NAVIGATE)[keyof typeof DEFAULT_PATH_NAVIGATE];
