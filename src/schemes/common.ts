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
