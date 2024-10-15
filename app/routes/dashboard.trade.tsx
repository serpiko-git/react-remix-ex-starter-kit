import '~/common/libs/logger';

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
} from '~/consts';
import {
  DashboardTrade,
  TradeCombineProps,
  TradeResponse,
} from '~/features/dashboard-trade';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const account_id = searchParams.get('account_id') || apiAccount_id;
  const trade_id = searchParams.get('trade_id') || DEFAULT_EMPTY;
  const page_no =
    searchParams.get('page_no') || String(DEFAULT_PAGINATION_PAGE);
  const page_size =
    searchParams.get('page_size') || String(DEFAULT_PAGINATION_LIMIT);
  const startTime = searchParams.get('start_time') || DEFAULT_START_TIME;
  const endTime = searchParams.get('end_time') || DEFAULT_END_TIME;

  searchParams.set('account_id', account_id);
  searchParams.set('trade_id', trade_id);
  searchParams.set('page_size', page_size.toString());
  searchParams.set('page_no', page_no.toString());
  searchParams.set('start_time', startTime.toString());
  searchParams.set('end_time', endTime.toString());

  console.group('Remix: loader');
  const fetchUrl = `${apiHost_v1}/trade-history/list?${searchParams.toString()}`;
  console.log({ fetchUrl });
  const response = await fetch(fetchUrl);

  const responseProps: TradeResponse = await response.json();
  console.log({ responseProps });

  const queriesProps = { account_id, page_no, page_size };
  const transactionCombine = { responseProps, queriesProps };

  console.groupEnd();

  return transactionCombine;
};

export default function index() {
  const transactionCombineProps: TradeCombineProps =
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
      <DashboardTrade
        responseProps={responseProps}
        queriesProps={queriesProps}
      />
    </div>
  );
}
