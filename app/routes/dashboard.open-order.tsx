import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { apiHost_v1, apiAccount_id } from '~/consts';
import {
  DEFAULT_OPEN_ORDER_LIMIT,
  DEFAULT_OPEN_ORDER_PAGE,
} from '~/consts/open-order';
import {
  DashboardOpenOrder,
  OpenOrderCombineProps,
  OpenOrderResponse,
} from '~/features/dashboard-open-order';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const account_id = url.searchParams.get('account_id') || apiAccount_id; // 기본값 설정
  const page = url.searchParams.get('page') || DEFAULT_OPEN_ORDER_PAGE;
  const limit = url.searchParams.get('limit') || DEFAULT_OPEN_ORDER_LIMIT;

  const fetchUrl = `${apiHost_v1}/open-order/list?account_id=${account_id}&page=${page}&limit=${limit}`;
  console.log({ fetchUrl });
  const response = await fetch(fetchUrl);

  const openOrderResponseProps: OpenOrderResponse = await response.json();
  console.log({ openOrderResponseProps });

  const openOrderQueriesProps = { account_id, page, limit };
  const openOrderCombine = { openOrderResponseProps, openOrderQueriesProps };

  return openOrderCombine;
};

export default function index() {
  const openOrderCombineProps: OpenOrderCombineProps =
    useLoaderData<typeof loader>();
  const { openOrderResponseProps, openOrderQueriesProps } =
    openOrderCombineProps;

  // console.log({ openOrderResponseProps });
  // console.log({ openOrderQueriesProps });

  return (
    <div>
      <DashboardOpenOrder
        openOrderResponseProps={openOrderResponseProps}
        openOrderQueriesProps={openOrderQueriesProps}
      />
    </div>
  );
}
