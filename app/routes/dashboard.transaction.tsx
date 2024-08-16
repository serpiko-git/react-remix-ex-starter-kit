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
  DEFAULT_END_TIME,
  DEFAULT_OPEN_ORDER_LIMIT,
  DEFAULT_OPEN_ORDER_PAGE,
  DEFAULT_START_TIME,
  DEFAULT_SYMBOL_LIST,
} from '~/consts/open-order';

import {
  DashboardTransaction,
  TransactionTable,
} from '~/features/dashboard-transaction';
import { TransactionCombineProps, TransactionResponse } from '~/features/dashboard-transaction/models/transaction.model';

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
  // to number
  const startTime = searchParams.get('start_time') || DEFAULT_START_TIME;
  const endTime = searchParams.get('end_time') || DEFAULT_END_TIME;

  searchParams.set('account_id', account_id);
  searchParams.set('symbol', symbol);
  searchParams.set('client_order_id', client_order_id);
  searchParams.set('transaction_id', transaction_id);
  searchParams.set('page', page.toString());
  searchParams.set('limit', limit.toString());
  searchParams.set('start_time', startTime.toString());
  searchParams.set('end_time', endTime.toString());
  

  console.group('Remix: loader');
  const fetchUrl = `${apiHost_v1}/transaction/list?${searchParams.toString()}`;
  console.log({ fetchUrl });
  const response = await fetch(fetchUrl);

  const responseProps: TransactionResponse = await response.json();
  console.log({ responseProps });

  const queriesProps = { account_id, page, limit };
  const transactionCombine = { responseProps, queriesProps };

  console.groupEnd();

  return transactionCombine;
};

export default function index() {
  const transactionCombineProps: TransactionCombineProps =
    useLoaderData<typeof loader>();
  const { responseProps, queriesProps } =
    transactionCombineProps;

  const { account_id, limit, page } = queriesProps;
  console.log(typeof limit, limit);
  const fetcher = useFetcher();
  const fetcherData = fetcher.data;
  if (fetcherData) {
    console.log('fetcherData', fetcherData);
  }

  return (
    <div>
      <DashboardTransaction
        responseProps={responseProps}
        queriesProps={queriesProps}
      />
    </div>
  );
}
