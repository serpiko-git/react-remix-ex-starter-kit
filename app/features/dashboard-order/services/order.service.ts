import { apiHost_v1 } from '~/consts';

import { OpenOrdersResponse } from '~/features/dashboard-order/models/order.model';

export async function getTanstack() {
  const response = await fetch('https://api.github.com/repos/TanStack/query');
  const data = await response.json();
  return data;
}

export async function getOpenOrders(openOrderId: string): Promise<OpenOrdersResponse> {
  const url = new URL(`${apiHost_v1}/open-orders/list`);

  const params = new URLSearchParams({ order_id: openOrderId });
  url.search = params.toString();

  const response = await fetch(url.toString());
  const data = await response.json();

  console.log('order_data: ', data);
  return data;
}
