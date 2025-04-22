import { array, InferOutput, number, object, optional, string } from '@valibot/valibot';

export const BalanceData = object({
  balance: number(),
});

export type BalanceData = InferOutput<typeof BalanceData>;

export const ChannelData = object({
  user_channel: string(),
  room_channel: string(),
});

export type ChannelData = InferOutput<typeof ChannelData>;

export const TicketIdData = object({
  ticketId: string(),
});

export type TicketIdData = InferOutput<typeof TicketIdData>;

export const BetData = object({
  bet: number(),
});

export type BetData = InferOutput<typeof BetData>;

export const ServerTicket = object({
  ticketId: string(),
  bet: number(),
  numbers: array(number()),
  win: optional(number()),
  coincidences: optional(array(number())),
});

export type ServerTicket = InferOutput<typeof ServerTicket>;

export const TicketData = object({
  ticket: ServerTicket,
});

export type TicketData = InferOutput<typeof TicketData>;

export const TicketListData = object({
  tickets: array(ServerTicket),
});

export type TicketListData = InferOutput<typeof TicketListData>;

export const WinData = object({
  userName: string(),
  win: number(),
});

export type WinData = InferOutput<typeof WinData>;

export const TicketWinData = object({
  ticketId: string(),
  win: number(),
  coincidences: array(number()),
});

export type TicketWinData = InferOutput<typeof TicketWinData>;
