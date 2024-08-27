import { BaseResponsePaging } from "~/features/models/common.model";
export const positionMode = {
  /** one-way mode */
  both: 0,
  /** hedge mode Buy/Long */
  buy: 1,
  /** hedge mode Sell/Short */
  sell: 2,
} as const;
export type PositionModeTypes =
  (typeof positionMode)[keyof typeof positionMode];
export const positionModeText = {
  0: 'both', // one-way mode
  1: 'buy', // hedge mode Buy/Long
  2: 'sell', // hedge mode Sell/Short
};

/** order side */
export const side = {
  /** Sell / Short */
  sell: 0,
  /** Buy / Long */
  buy: 1,
} as const;
export type SideTypes = (typeof side)[keyof typeof side];
export const sideText = {
  0: 'sell',
  1: 'buy',
};
