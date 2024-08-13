import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { apiHost_v1, apiAccount_id } from '~/consts';
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
  const page = url.searchParams.get('page') || '1';
  const limit = url.searchParams.get('limit') || '20';

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

  console.log({ openOrderResponseProps });
  console.log({ openOrderQueriesProps });
  return (
    <div>
      <DashboardOpenOrder
        openOrderResponseProps={openOrderResponseProps}
        openOrderQueriesProps={openOrderQueriesProps}
      />
    </div>
  );
}
