import { useQuery } from '@tanstack/react-query';

import { getOpenOrders, getTanstack } from '~/features/dashboard-order/services/order.service';

export const useTanstack = (enabled = true) =>
  useQuery({
    queryKey: ['tanstack'],
    queryFn: () => getTanstack(),
    enabled,
    retry: false,
  });

export const useOrder = (orderId: string, enabled = true) =>
  useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOpenOrders(orderId),
    enabled,
    retry: false,
  });

