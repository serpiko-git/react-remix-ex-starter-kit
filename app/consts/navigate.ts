export const DEFAULT_DASHBOARD_PATH = {
  symbols: '/dashboard/symbol',
  userBalance: '/dashboard/user-balance',
  openOrder: '/dashboard/open-order',
  closedOrderPnl: '/dashboard/closed-order-pnl',
  closedPositionPnl: '/dashboard/closed-position-pnl',
  transaction: '/dashboard/transaction',
  trade: '/dashboard/trade',
  snapshotPosition: '/dashboard/snapshot-position',
  etcdService: '/dashboard/etcd-service',
  matchingEngine: '/dashboard/matching-engine',
  exchangeBalance: '/dashboard/exchange-balance',
  userPnl: '/dashboard/user-pnl',
  serverControl: '/dashboard/server-control',
};

export const DEFAULT_PATH_NAVIGATE = {
  index: '/',
  dashboard: DEFAULT_DASHBOARD_PATH,
} as const;
