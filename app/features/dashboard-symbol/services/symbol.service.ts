import { apiHost_v1 } from '~/consts';
import { SymbolResponse } from '~/features/dashboard-symbol/models/symbol.model';

export async function getTanstack() {
  const response = await fetch('https://api.github.com/repos/TanStack/query');
  const data = await response.json();
  return data;
}

export async function getSymbol(symbolId: string): Promise<SymbolResponse> {
  const url = new URL(`${apiHost_v1}/symbol`);
  const params = new URLSearchParams({ symbol_id: symbolId });
  console.log('getSymbol : ', url.toString());

  url.search = params.toString();
  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
}
