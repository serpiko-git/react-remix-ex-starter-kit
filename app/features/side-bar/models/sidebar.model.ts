import { DEFAULT_PATH_NAVIGATE } from '~/consts/navigate';

export type PathNavigateTypes =
  (typeof DEFAULT_PATH_NAVIGATE)[keyof typeof DEFAULT_PATH_NAVIGATE];
