import {
  LoaderFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';

import { apiHost_v1, apiAccount_id } from '~/consts';
import {
  DEFAULT_EMPTY,
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from '~/consts/consts';
import {
  DashboardSnapshotPosition,
  SnapshotPositionCombineProps,
  SnapshotPositionResponse
} from '~/features/dashboard-snapshot-position';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const accountId = searchParams.get('account_id') || apiAccount_id;
  const transactionId = searchParams.get('transaction_id') || DEFAULT_EMPTY;
  const startTime = searchParams.get('start_time') || DEFAULT_EMPTY;
  const endTime = searchParams.get('end_time') || DEFAULT_EMPTY;
  const pageNo = searchParams.get('page_no') || String(DEFAULT_PAGINATION_PAGE);
  const pageSize = searchParams.get('page_size') || String(DEFAULT_PAGINATION_LIMIT);

  searchParams.set('account_id', accountId);
  searchParams.set('transaction_id', transactionId);
  searchParams.set('start_time', startTime);
  searchParams.set('end_time', endTime);
  searchParams.set('page_no', pageNo.toString());
  searchParams.set('page_size', pageSize.toString());

  console.group('Remix: loader');
  const fetchUrl = `${apiHost_v1}/snapshot/position/list?${searchParams.toString()}`;
  console.log({ fetchUrl });
  const response = await fetch(fetchUrl);

  const responseProps: SnapshotPositionResponse = await response.json();
  console.log({ responseProps });

  const queriesProps = { account_id: accountId, page: pageNo, limit: pageSize };
  const snapshotPositionCombined = { responseProps, queriesProps };

  console.groupEnd();

  return snapshotPositionCombined;
};
export default function index() {
  const snapshotPositionCombined = useLoaderData<SnapshotPositionCombineProps>();
  const { responseProps, queriesProps } = snapshotPositionCombined;

  return (
    <DashboardSnapshotPosition
      responseProps={responseProps}
      queriesProps={queriesProps}
    />
  );
}



