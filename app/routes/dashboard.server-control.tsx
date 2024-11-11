import '~/common/libs/logger';
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { apiHost_v1 } from '~/consts';
import {
  DashboardEtcdService,
  EtcdServiceActiveTypes,
  EtcdServiceCombineProps,
  EtcdServiceQueries,
  EtcdServiceResponse,
} from '~/features/dashboard-etcd-service';
import {
  DashboardServerControl,
  EtcdServiceListResponse,
} from '~/features/dashboard-server-control';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const active = searchParams.get('active');

  if (active !== null) {
    searchParams.set('active', active);
  }

  const fetchUrl = `${apiHost_v1}/etcd/service/list?${searchParams.toString()}`;
  const response = await fetch(fetchUrl);
  const responseProps: EtcdServiceListResponse = await response.json();

  return responseProps;
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get('action');

  if (actionType === 'delete') {
    // const response = await fetch(`${apiHost_v1}/acs/order/cancel`, {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: '100',
        actionType,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.json();

    return json(data);
  }
  return null;
};

export default function index() {
  const etcdServiceListResponse: EtcdServiceListResponse =
    useLoaderData<typeof loader>();
  return (
    <>
      <DashboardServerControl
        etcdServiceListResponse={etcdServiceListResponse}
      />
    </>
  );
}
