// import '~/common/libs/logger';

import { LoaderFunction } from '@remix-run/node';

import { DashboardExchangeBalance } from '~/features/dashboard-exchange-balance/components/DashboardExchangeBalance';

export default function index() {
  return (
    <div>
      <DashboardExchangeBalance />
    </div>
  );
}
