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
} from '~/consts';
import { DashboardUserBalance } from '~/features/dashboard-user-balance';
import {
  UserBalanceCombineProps,
  UserBalanceResponse,
} from '~/features/dashboard-user-balance/models/user-balance.model';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const page = searchParams.get('page') || DEFAULT_PAGINATION_PAGE;
  const limit = searchParams.get('limit') || DEFAULT_PAGINATION_LIMIT;
  const account_id = searchParams.get('account_id') || DEFAULT_EMPTY;
  const asset = searchParams.get('asset') || DEFAULT_EMPTY;

  searchParams.set('page', page.toString());
  searchParams.set('limit', limit.toString());
  searchParams.set('account_id', account_id);
  searchParams.set('asset', asset);

  const fetchUrl = `${apiHost_v1}/user/balance/list?page=${page}&limit=${limit}&account_id=${account_id}&asset=${asset}`;

  const response = await fetch(fetchUrl);
  const responseProps: UserBalanceResponse = await response.json();
  console.log('fetchUrl:', fetchUrl);
  console.log('responseProps:', responseProps);
  const queriesProps = {
    page,
    limit,
    account_id,
    asset,
  };
  const userBalanceCombine = { responseProps, queriesProps };

  return userBalanceCombine;
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get('actionType');
  return redirect('./');
};

export default function index() {
  const combineProps: UserBalanceCombineProps = useLoaderData<typeof loader>();
  const { responseProps, queriesProps } = combineProps;
  return (
    <div>
      <DashboardUserBalance
        responseProps={responseProps}
        queriesProps={queriesProps}
      />
    </div>
  );
}
