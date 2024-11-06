// import '~/common/libs/logger';

import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import {
  apiHost_v1,
  apiAccount_id,
  DEFAULT_EMPTY,
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from '~/consts';
import {
  ExchangeBalanceCombineProps,
  ExchangeBalanceResponse,
  DashboardExchangeBalance,
  ExchangeBalance,
} from '~/features/dashboard-exchange-balance';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const fetchUrl = `${apiHost_v1}/prometheus/market`;
  console.log('fetchUrl: ', fetchUrl);

  const response = await fetch(fetchUrl);
  const responseProps: ExchangeBalanceResponse = await response.json();
  console.log({ responseProps });

  const queriesProps = {};

  const exchangeBalanceCombine = { responseProps, queriesProps };

  return exchangeBalanceCombine;
};

export default function index() {
  const combineProps: ExchangeBalanceCombineProps =
    useLoaderData<typeof loader>();
  const { responseProps, queriesProps } = combineProps;

  return (
    <div>
      <DashboardExchangeBalance
        responseProps={responseProps}
        queriesProps={queriesProps}
      />
    </div>
  );
}
