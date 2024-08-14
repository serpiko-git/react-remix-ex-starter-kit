import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { DashboardOrder } from '~/features/dashboard-order-example';

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
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: Users[] = await response.json();
  return data;
};

export default function index() {
  const datas: Users[] = useLoaderData<typeof loader>();
  const props = datas;
  return (
    <div>
      <DashboardOrder {...props} />
    </div>
  );
}
