import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';

import { apiHost_v1, apiAccount_id } from '~/consts';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from '~/consts/consts';
import {
  DashbaordClosedPositionPnl as DashboardClosedPositionPnl,
  ClosedPositionPnlResponse,
  ClosedPositionPnlQueries,
  ClosedPositionPnlCombineProps,
} from '~/features/dashboard-closed-postion-pnl';

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const account_id = url.searchParams.get('account_id') || apiAccount_id; // 기본값 설정
  const page = Number(url.searchParams.get('page')) || DEFAULT_PAGINATION_PAGE;
  const limit =
    Number(url.searchParams.get('limit')) || DEFAULT_PAGINATION_LIMIT;
  const category = url.searchParams.get('category') || 'linear';
  const startTime = url.searchParams.get('start_time') || '2';
  const endTime = url.searchParams.get('end_time') || '999999999999';

  console.group('Remix: loader');
  const fetchUrl = `${apiHost_v1}/closed-pnl-position/list?
account_id=${account_id}&
page=${page}&
limit=${limit}&
category=${category}&
start_time=${startTime}&
end_time=${endTime}`;

  console.log({ fetchUrl });
  const response = await fetch(fetchUrl);

  const responseProps: ClosedPositionPnlResponse = await response.json();
  console.log({ responseProps });
  const queriesProps: ClosedPositionPnlQueries = {
    account_id,
    page,
    limit,
  };

  const combinedProps = { responseProps, queriesProps };

  console.groupEnd();

  return combinedProps;
};

// Not need action function
export default function index() {
  const combinedProps: ClosedPositionPnlCombineProps =
    useLoaderData<ClosedPositionPnlCombineProps>();
  const { responseProps, queriesProps } = combinedProps;

  console.log({ responseProps });
  console.log({ queriesProps });

  const fetcher = useFetcher();
  const fetcherData = fetcher.data;
  if (fetcherData) {
    console.log({ fetcherData });
  }

  return (
    <div>
      <DashboardClosedPositionPnl
        responseProps={responseProps}
        queriesProps={queriesProps}
      />
    </div>
  );
}
