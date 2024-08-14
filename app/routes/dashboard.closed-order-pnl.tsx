import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { apiHost_v1, apiAccount_id } from '~/consts';
import {
  ClosedOrderPnlCombinProps,
  ClosedOrderPnlResponse,
  DashboardClosedOrderPnl,
} from '~/features/dashboard-closed-order-pnl';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const account_id = url.searchParams.get('account_id') || apiAccount_id; // 기본값 설정
  const page = url.searchParams.get('page') || '1';
  const limit = url.searchParams.get('limit') || '20';
  const category = url.searchParams.get('category') || 'linear';
  const startTime = url.searchParams.get('start_time') || '2';
  const endTime= url.searchParams.get('end_time') || '999999999999';
  
  const fetchUrl = `${apiHost_v1}/closed-pnl-order/list?
account_id=${account_id}&
page=${page}&
limit=${limit}&
category=${category}&
start_time=${startTime}&
end_time=${endTime}`;
  
  console.log({ fetchUrl });
  const response = await fetch(fetchUrl);

  const responseProps: ClosedOrderPnlResponse = await response.json();
  if (responseProps.code !== 0) {
    // return customized ClsoedOrderPnlResponse
    return {
      responseProps: {
        code: responseProps.code,
        message: responseProps.msg,
        data: [],
        total: 0,
      },
      queriesProps: {
        account_id,
        page,
        limit,
      },
    };
  }

  const queriesProps = { account_id, page, limit };
  const openOrderCombine = { responseProps, queriesProps };

  return openOrderCombine;
};

export default function index() {
  const combineProps: ClosedOrderPnlCombinProps = useLoaderData<typeof loader>();
  const { responseProps, queriesProps } = combineProps;
  
  console.log({ responseProps });
  console.log({ queriesProps });
  
  return (
    <div>
      <DashboardClosedOrderPnl
        responseProps={responseProps}
        queriesProps={queriesProps}
      />
    </div>
  );
}

