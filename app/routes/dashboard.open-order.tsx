import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';

import { apiHost_v1, apiAccount_id } from '~/consts';
import {
  DEFAULT_EMPTY,
  DEFAULT_OPEN_ORDER_LIMIT,
  DEFAULT_OPEN_ORDER_PAGE,
  DEFAULT_SYMBOL_LIST,
} from '~/consts/open-order';
import {
  DashboardOpenOrder,
  OpenOrderCombineProps,
  OpenOrderResponse,
} from '~/features/dashboard-open-order';

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const account_id = searchParams.get('account_id') || apiAccount_id;
  const symbol = searchParams.get('symbol') || DEFAULT_SYMBOL_LIST.BTCUSDT;
  const client_order_id = searchParams.get('client_order_id') || DEFAULT_EMPTY;
  const transaction_id = searchParams.get('transaction_id') || DEFAULT_EMPTY;
  const page = searchParams.get('page') || String(DEFAULT_OPEN_ORDER_PAGE);
  const limit = searchParams.get('limit') || String(DEFAULT_OPEN_ORDER_LIMIT);

  searchParams.set('account_id', account_id);
  searchParams.set('symbol', symbol);
  searchParams.set('client_order_id', client_order_id);
  searchParams.set('transaction_id', transaction_id);
  searchParams.set('page', page.toString());
  searchParams.set('limit', limit.toString());

  console.group('Remix: loader');
  const fetchUrl = `${apiHost_v1}/open-order/list?${searchParams.toString()}`;
  console.log({ fetchUrl });
  const response = await fetch(fetchUrl);

  const openOrderResponseProps: OpenOrderResponse = await response.json();
  console.log({ openOrderResponseProps });

  const openOrderQueriesProps = { account_id, page, limit };
  const openOrderCombine = { openOrderResponseProps, openOrderQueriesProps };

  console.groupEnd();

  return openOrderCombine;
};

export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get('action');

  if (actionType === 'delete') {
    const symbol = formData.get('symbol');
    const order_id = formData.get('order_id');
    const account_id = formData.get('account_id');
    const page = formData.get('page');
    const limit = formData.get('limit');

    console.log(symbol, order_id);
    const response = await fetch(`${apiHost_v1}/acs/order/cancel`, {
      method: 'POST',
      body: JSON.stringify({
        symbol,
        order_id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.json();
    console.log('action delete', data);
    // return json(data);

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    if (page) searchParams.set('page', page.toString());
    if (limit) searchParams.set('limit', limit.toString());
    if (account_id) searchParams.set('account_id', account_id.toString());

    return redirect(`./?${searchParams.toString()}`);
  }
  return null;
};

export default function index() {
  const openOrderCombineProps: OpenOrderCombineProps =
    useLoaderData<typeof loader>();
  const { openOrderResponseProps, openOrderQueriesProps } =
    openOrderCombineProps;

  const { account_id, limit, page } = openOrderQueriesProps;
  console.log(typeof limit, limit);

  const fetcher = useFetcher();
  const fetcherData = fetcher.data;
  if (fetcherData) {
    console.log('fetcherData', fetcherData);
  }

  return (
    <div>
      <DashboardOpenOrder
        openOrderResponseProps={openOrderResponseProps}
        openOrderQueriesProps={openOrderQueriesProps}
      />
    </div>
  );
}
