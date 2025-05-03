import { array, InferOutput, intersect, number, object, string } from '@valibot/valibot';

export const BalanceData = object({
  balance: number(),
});

export type BalanceData = InferOutput<typeof BalanceData>;

export const BetData = object({
  bet: number(),
});

export type BetData = InferOutput<typeof BetData>;

export const ChannelData = object({
  userChannel: string(),
  roomChannel: string(),
});

export type ChannelData = InferOutput<typeof ChannelData>;

export const TicketIdData = object({
  ticketId: string(),
});

export type TicketIdData = InferOutput<typeof TicketIdData>;

export const UserNameData = object({
  userName: string(),
});

export type UserNameData = InferOutput<typeof UserNameData>;

export const TotalWinData = object({
  totalWin: number(),
});

export type TotalWinData = InferOutput<typeof TotalWinData>;

export const WinData = object({
  win: number(),
});

export type WinData = InferOutput<typeof WinData>;

export const CountdownData = object({
  countdown: number(),
});

export type CountdownData = InferOutput<typeof CountdownData>;

export const AddValueData = object({
  added: number(),
});

export type AddValueData = InferOutput<typeof AddValueData>;

export const BallListData = object({
  balls: array(number()),
});

export type BallListData = InferOutput<typeof BallListData>;

export const HitListData = object({
  hits: array(number()),
});

export type HitListData = InferOutput<typeof HitListData>;

export const SpotListData = object({
  spots: array(number()),
});

export type SpotListData = InferOutput<typeof SpotListData>;

export const TicketData = object({
  ticket: intersect([TicketIdData, BetData, SpotListData]),
});

export type TicketData = InferOutput<typeof TicketData>;

export const TicketListData = object({
  tickets: array(intersect([TicketIdData, BetData, SpotListData])),
});

export type TicketListData = InferOutput<typeof TicketListData>;

export const TicketWinData = object({
  ticketWin: intersect([TicketIdData, WinData, HitListData]),
});

export type TicketWinData = InferOutput<typeof TicketWinData>;

export const TicketWinListData = object({
  ticketWins: array(intersect([TicketIdData, WinData, HitListData])),
});

export type TicketWinListData = InferOutput<typeof TicketWinListData>;

export const UserWinData = object({
  userWin: intersect([UserNameData, TotalWinData]),
});

export type UserWinData = InferOutput<typeof UserWinData>;

export const UserWinListData = object({
  userWins: array(intersect([UserNameData, TotalWinData])),
});

export type UserWinListData = InferOutput<typeof UserWinListData>;
