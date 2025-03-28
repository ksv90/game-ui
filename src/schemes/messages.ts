import { array, InferOutput, literal, number, object, string, union } from '@valibot/valibot';

import { ServerTicket } from './common';

export const TicketCreateMessage = object({
  type: literal('ticket-create'),
  ticket: ServerTicket,
});

export type TicketCreateMessage = InferOutput<typeof TicketCreateMessage>;

export const TicketCancelMessage = object({
  type: literal('ticket-cancel'),
  ticketId: string(),
});

export type TicketCancelMessage = InferOutput<typeof TicketCancelMessage>;

export const RoundStartMessage = object({
  type: literal('round-start'),
});

export type RoundStartMessage = InferOutput<typeof RoundStartMessage>;

export const RoundCompleteMessage = object({
  type: literal('round-complete'),
  numbers: array(number()),
});

export type RoundCompleteMessage = InferOutput<typeof RoundCompleteMessage>;

export const RoundProcessMessage = object({
  type: literal('round-process'),
  numbers: array(number()),
  added: number(),
});

export type RoundProcessMessage = InferOutput<typeof RoundProcessMessage>;

export const RoundCountdownMessage = object({
  type: literal('round-countdown'),
  countdown: number(),
});

export type RoundCountdownMessage = InferOutput<typeof RoundCountdownMessage>;

export const BetUpdateMessage = object({
  type: literal('bet-change'),
  bet: number(),
});

export type BetUpdateMessage = InferOutput<typeof BetUpdateMessage>;

export const BalanceUpdateMessage = object({
  type: literal('balance-update'),
  balance: number(),
});

export type BalanceUpdateMessage = InferOutput<typeof BalanceUpdateMessage>;

export const RoomMessage = union([
  TicketCreateMessage,
  TicketCancelMessage,
  RoundStartMessage,
  RoundCompleteMessage,
  RoundProcessMessage,
  RoundCountdownMessage,
]);

export type RoomMessage = InferOutput<typeof RoomMessage>;

export const UserMessage = union([BetUpdateMessage, BalanceUpdateMessage]);

export type UserMessage = InferOutput<typeof UserMessage>;
