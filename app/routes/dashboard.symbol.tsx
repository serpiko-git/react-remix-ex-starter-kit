import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';

import { apiHost_v1 } from '~/consts';
import { DashboardSymbol, SymbolResponse } from '~/features/dashboard-symbol';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const response = await fetch(`${apiHost_v1}/symbol/list`);
  const data: SymbolResponse = await response.json();
  return data;
};

export default function index() {
  const data: SymbolResponse = useLoaderData<typeof loader>();

  /** sample code (useFetcher 사용 방법) */
  const fetcher = useFetcher();
  const fetcherData = fetcher.data;
  if (fetcherData) {
    console.log('fetcherData', fetcherData);
  }

  return (
    <div>
      <DashboardSymbol {...data} />
    </div>
  );
}
