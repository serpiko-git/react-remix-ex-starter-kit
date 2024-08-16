import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { responseEncoding } from 'axios';
import { URL } from 'url';

import { apiHost_v1 } from '~/consts';
import { DashboardOpenOrder } from '~/features/dashboard-open-order';

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const account_id = url.searchParams.get('account_id') || 1;
  const order_id = url.searchParams.get('order_id') || 0;
  const page = url.searchParams.get('page') || 1;
  const limit = url.searchParams.get('limit') || 20;
  const symbol = url.searchParams.get('symbol') || '';
  const category = url.searchParams.get('category') || '';

  const requestUrl = `${apiHost_v1}/open-order/list?
account_id=${account_id}&
order_id=${order_id}&
page=${page}&
limit=${limit}&
symbol=${symbol}&
category=${category}
`
  console.log('open_orders_requestUrl: ', requestUrl);
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: responseEncoding = await response.json();
  console.log('open_orders_console: ', data);
  return data;
};

export default function index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <DashboardOpenOrder {...data} />
    </div>
  );
}
