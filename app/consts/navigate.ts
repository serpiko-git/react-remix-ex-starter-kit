export const DEFAULT_DASHBOARD_PATH = {
  symbols: '/dashboard/symbol',
  openOrder: '/dashboard/open-order',
  closedOrderPnl: '/dashboard/closed-order-pnl',
  closedPositionPnl: '/dashboard/closed-position-pnl',
  transaction: '/dashboard/transaction',
  trade: '/dashboard/trade',
  snapshotPosition: '/dashboard/snapshot-position',
};

export const DEFAULT_PATH_NAVIGATE = {
  index: '/',
  dashboard: DEFAULT_DASHBOARD_PATH,
} as const;
