import { useQuery } from '@tanstack/react-query';

import { getSymbol, getTanstack } from '../services/symbol.service';

export const useTanstack = (enabled = true) =>
  useQuery({
    queryKey: ['tanstack'],
    queryFn: () => getTanstack(),
    enabled,
    retry: false,
  });

export const useSymbol = (symbolId: string, enabled = true) =>
  useQuery({
    queryKey: ['symbol', symbolId],
    queryFn: () => getSymbol(symbolId),
    enabled,
    retry: false,
  });
