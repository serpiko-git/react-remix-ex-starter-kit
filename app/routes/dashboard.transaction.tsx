import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';

import {
  apiHost_v1,
  apiAccount_id,
  DEFAULT_EMPTY,
  DEFAULT_END_TIME,
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_START_TIME,
  DEFAULT_SYMBOL_LIST,
} from '~/consts';
import {
  DashboardTransaction,
  TransactionCombineProps,
  TransactionResponse,
} from '~/features/dashboard-transaction';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  // to number

  searchParams.set(
    'account_id',
    searchParams.get('account_id') || DEFAULT_EMPTY,
  );
  searchParams.set(
    'symbol',
    searchParams.get('symbol') || DEFAULT_SYMBOL_LIST.BTCUSDT,
  );
  searchParams.set(
    'client_order_id',
    searchParams.get('client_order_id') || DEFAULT_EMPTY,
  );
  searchParams.set(
    'transaction_id',
    searchParams.get('transaction_id') || DEFAULT_EMPTY,
  );
  searchParams.set(
    'page_no',
    searchParams.get('page_no') || String(DEFAULT_PAGINATION_PAGE),
  );
  searchParams.set(
    'page_size',
    searchParams.get('page_size') || String(DEFAULT_PAGINATION_LIMIT),
  );
  searchParams.set(
    'start_time',
    searchParams.get('start_time') || String(DEFAULT_START_TIME),
  );
  searchParams.set(
    'end_time',
    searchParams.get('end_time') || String(DEFAULT_END_TIME),
  );

  console.group('Remix: loader');
  const fetchUrl = `${apiHost_v1}/transaction/list?${searchParams.toString()}`;
  console.log({ fetchUrl });
  const response = await fetch(fetchUrl);

  const responseProps: TransactionResponse = await response.json();
  console.log({ responseProps });

  const queriesProps = {
    account_id: searchParams.get('account_id') || apiAccount_id,
    page: searchParams.get('page_no') || String(DEFAULT_PAGINATION_PAGE),
    limit: searchParams.get('page_size') || String(DEFAULT_PAGINATION_LIMIT),
  };
  const transactionCombine = { responseProps, queriesProps };

  console.groupEnd();

  return transactionCombine;
};

export default function index() {
  const transactionCombineProps: TransactionCombineProps =
    useLoaderData<typeof loader>();
  const { responseProps, queriesProps } = transactionCombineProps;

  const { account_id, page_size, page_no } = queriesProps;
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
