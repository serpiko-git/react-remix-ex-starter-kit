import '~/common/libs/logger';
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import {
  apiHost_v1,
  apiAccount_id,
  DEFAULT_EMPTY,
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_SYMBOL_LIST,
  DEFAULT_DASHBOARD_TICKER,
} from '~/consts';
import {
  DashboardUserPnl,
  UserPnlCombineProps,
  UserPnlResponse,
} from '~/features/dashboard-user-pnl';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const ticker = searchParams.get('ticker') || DEFAULT_DASHBOARD_TICKER;
  const page = searchParams.get('page') || String(DEFAULT_PAGINATION_PAGE);
  const limit = searchParams.get('limit') || String(DEFAULT_PAGINATION_LIMIT);

  searchParams.set('ticker', ticker);
  searchParams.set('page', page.toString());
  searchParams.set('limit', limit.toString());

  const fetchUrl = `${apiHost_v1}/prometheus/user-balance?${searchParams.toString()}`;
  console.log('fetchUrl: ', fetchUrl);

  const response = await fetch(fetchUrl);
  const responseProps: UserPnlResponse = await response.json();

  if (responseProps.code !== 0) {
    return {
      responseProps: {
        code: responseProps.code,
        message: responseProps.msg,
        data: responseProps.data,
        time_now: responseProps.time_now,
      },
      queriesProps: {
        ticker,
        page,
        limit,
      },
    };
  }
  const queriesProps = { ticker, page, limit };
  const userPnlCombine = { responseProps, queriesProps };

  return userPnlCombine;
};

export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get('action');

  return redirect('./');
};

export default function index() {
  const combineProps: UserPnlCombineProps = useLoaderData<typeof loader>();
  const { responseProps, queriesProps } = combineProps;
  return (
    <div>
      <DashboardUserPnl
        responseProps={responseProps}
        queriesProps={queriesProps}
      />
    </div>
  );
}
