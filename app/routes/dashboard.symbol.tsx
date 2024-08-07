import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import SymbolDashboard from '~/features/symbol-dashboard/App';

interface BaseResponse<T> {
  code: number;
  data: T[];
  msg: string;
  time_now: string;
}

interface SymbolResponseData {
  symbol_id: string;
  symbol_alias: string;
  symbol_name: string;
  status: number;
  base_asset: string;
  quote_asset: string;
  updated_at: string;
  created_at: string;
  contract_type: number;
}

export interface SymbolResponse extends BaseResponse<SymbolResponseData> {}

const API_URL = process.env.REACT_APP_API_HOST_V1;

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const response = await fetch(`${API_URL}/symbol/list`);
  const data: SymbolResponse = await response.json();
  return data;
};

export default function index() {
  const data: SymbolResponse = useLoaderData<typeof loader>();
  return (
    <div>
      <SymbolDashboard {...data} />
    </div>
  );
}
