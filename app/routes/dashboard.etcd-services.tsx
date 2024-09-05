import { ImageNotSupportedOutlined } from '@mui/icons-material';
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';

import { apiHost_v1, apiAccount_id } from '~/consts';
import {
  DEFAULT_EMPTY,
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_SYMBOL_LIST,
} from '~/consts/consts';
/**
import {
  EtcdServiceListCombineProps,
  EtcdServiceListResponse,
} from '~/features/dashbarod-etcd-services';
import { DashboardEtcdService } from '~/features/dashbarod-etcd-services/components/DashboardEtcdService';
export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const serviceName = url.searchParams.get('account_id') || apiAccount_id; // 기본값 설정
  const srviceId = url.searchParams.get('service_id') || DEFAULT_EMPTY;
  const active = url.searchParams.get('active') || DEFAULT_EMPTY;
  console.group('Remix: loader');

  const fetchUrl = `${apiHost_v1}/etcd/service/list?
  service_name=${serviceName}&
  service_id=${srviceId}&
  active=${active}`;
  console.log({ fetchUrl });
  const response = await fetch(fetchUrl);

  const responseProps: EtcdServiceListResponse = await response.json();
  if (responseProps.code !== 0) {
    // return customized ClsoedOrderPnlResponse
    return {
      responseProps: {
        code: responseProps.code,
        message: responseProps.msg,
        data: responseProps.data,
        total: 0,
      },
      queriesProps: {
        serviceName,
        srviceId,
        active,
      },
    };
  }
  const queriesProps = {
    serviceName,
    srviceId,
    active,
  };
  return { responseProps, queriesProps };
};

export default function index2() {
  const combineProps: EtcdServiceListCombineProps =
    useLoaderData<typeof loader>();
  const { responseProps, queriesProps } = combineProps;

  const { service_id, service_name, active } = queriesProps;
  const fetcher = useFetcher();
  const fetcherData = fetcher.data;
  if (fetcherData) {
    console.log('fetcherData', fetcherData);
  }

  return (
    <div>
      <DashboardEtcdService
        responseProps={responseProps}
        queriesProps={queriesProps}
      />
    </div>
  );
}
* */
