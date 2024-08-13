import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { apiHost_v1, account_id } from '~/consts';
import {
  DashboardOpenOrder,
  OpenOrderResponse,
} from '~/features/dashboard-open-order';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const response = await fetch(
    `${apiHost_v1}/open-order/list?account_id=${account_id}&page=1&limit=20`,
  );
  const data: OpenOrderResponse = await response.json();
  return data;
};

export default function index() {
  const datas: OpenOrderResponse = useLoaderData<typeof loader>();
  const props = datas;
  return (
    <div>
      <DashboardOpenOrder {...props} />
    </div>
  );
}
