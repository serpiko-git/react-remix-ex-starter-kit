import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

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
  const account_id = url.searchParams.get('account_id') || apiAccount_id;
  const page = Number(url.searchParams.get('page')) || DEFAULT_PAGINATION_PAGE;
  const limit =
    Number(url.searchParams.get('limit')) || DEFAULT_PAGINATION_LIMIT;
  const category = url.searchParams.get('category') || 'linear';
  const startTime = url.searchParams.get('start_time') || '2';
  const endTime = url.searchParams.get('end_time') || '999999999999';
  const fetchUrl = `${apiHost_v1}/closed-pnl-position/list?account_id=${account_id}&page=${page}&limit=${limit}&category=${category}&start_time=${startTime}&end_time=${endTime}`;

  console.log(`request url: ${fetchUrl}`);
  const response = await fetch(fetchUrl);
  const responseProps: ClosedPositionPnlResponse = await response.json();

  if (responseProps.code !== 0) {
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

  const queriesProps: ClosedPositionPnlQueries = {
    account_id,
    page,
    limit,
  };
  const combinedProps = { responseProps, queriesProps };

  return combinedProps;
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get('action');

  if (actionType === 'get') {
    const account_id = formData.get('account_id');
    const category = formData.get('category');
    const start_time = formData.get('start_time');
    const end_time = formData.get('end_time');
    const page = formData.get('page');
    const limit = formData.get('limit');

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    if (page) searchParams.set('page', page.toString());
    if (limit) searchParams.set('limit', limit.toString());
    if (account_id) searchParams.set('account_id', account_id.toString());

    return redirect(
      `./?account_id=${account_id}&category=${category}&start_time=${start_time}&end_time=${end_time}&page=${page}&limit=${limit}`,
    );
  }
  return null;
};

export default function index() {
  const combinedProps: ClosedPositionPnlCombineProps =
    useLoaderData<ClosedPositionPnlCombineProps>();
  const { responseProps, queriesProps } = combinedProps;

  return (
    <div>
      <DashboardClosedPositionPnl
        responseProps={responseProps}
        queriesProps={queriesProps}
      />
    </div>
  );
}
