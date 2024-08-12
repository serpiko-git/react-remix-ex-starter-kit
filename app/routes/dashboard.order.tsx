import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { responseEncoding } from 'axios';
import { Response } from 'express';

import { apiHost_v1 } from '~/consts';
import { DashboardOrder } from '~/features/dashboard-order';

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const response = await fetch(`${apiHost_v1}/open-order/list`);
  const data: responseEncoding = await response.json();
  return data;
};

export default function index() {
  // const datas: Users[] = useLoaderData<typeof loader>();
  const data = useLoaderData<typeof loader>();
  const datas = data.list;
  const props = datas;
  return (
    <div>
      <DashboardOrder {...props} />
    </div>
  );
}
