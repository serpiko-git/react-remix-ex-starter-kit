import '~/common/libs/logger';
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
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

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const service_id = searchParams.get('service_id');
  const service_name = searchParams.get('service_name');
  const active = searchParams.get('active');

  if (service_id !== null) {
    searchParams.set('service_id', service_id);
  }
  if (service_name !== null) {
    searchParams.set('service_name', service_name);
  }
  if (active !== null) {
    searchParams.set('active', active);
  }

  const fetchUrl = `${apiHost_v1}/etcd/service/list?${searchParams.toString()}`;
  const response = await fetch(fetchUrl);
  const responseProps: EtcdServiceResponse = await response.json();
  const queriesProps: EtcdServiceQueries = {
    service_id,
    service_name,
    active: active as EtcdServiceActiveTypes,
  };
  const etcdServiceCombine = { responseProps, queriesProps };

  return etcdServiceCombine;
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get('action');
  if (actionType === 'update') {
    const service_id = formData.get('service_id');
    const service_status = Number(formData.get('service_status'));
    const response = await fetch(`${apiHost_v1}/etcd/service/update`, {
      method: 'POST',
      body: JSON.stringify({
        service_id,
        service_status,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    console.log('action update response:', data);
    return data;
  }
  return null;
};

export default function index() {
  const combineProps: EtcdServiceCombineProps = useLoaderData<typeof loader>();

  return (
    <>
      <DashboardEtcdService {...combineProps} />
    </>
  );
}
