import '~/common/libs/logger';

import { LoaderFunction } from '@remix-run/node';

import { DashboardMatchingEngine } from '~/features/dashboard-matching-engine/components';

export default function index() {
  return (
    <div>
      <DashboardMatchingEngine />
    </div>
  );
}
