import { InferOutput, intersect, literal, number, object, union } from '@valibot/valibot';

import {
  AddValueData,
  BalanceData,
  BallListData,
  BetData,
  CountdownData,
  TicketData,
  TicketIdData,
  TicketWinListData,
  TotalWinData,
  UserWinListData,
} from './common';

export const TicketCreateMessage = intersect([
  object({
    type: literal('ticket-create'),
  }),
  TicketData,
]);

export type TicketCreateMessage = InferOutput<typeof TicketCreateMessage>;

export const TicketCancelMessage = intersect([
  object({
    type: literal('ticket-cancel'),
  }),
  TicketIdData,
]);

export type TicketCancelMessage = InferOutput<typeof TicketCancelMessage>;

export const RoundStartMessage = object({
  type: literal('round-start'),
  users: number(),
});

export type RoundStartMessage = InferOutput<typeof RoundStartMessage>;

export const RoundCompleteMessage = intersect([
  object({
    type: literal('round-complete'),
  }),
  BallListData,
  UserWinListData,
]);

export type RoundCompleteMessage = InferOutput<typeof RoundCompleteMessage>;

export const RoundProcessMessage = intersect([
  object({
    type: literal('round-process'),
  }),
  BallListData,
  AddValueData,
]);

export type RoundProcessMessage = InferOutput<typeof RoundProcessMessage>;

export const RoundCountdownMessage = intersect([
  object({
    type: literal('round-countdown'),
  }),
  CountdownData,
]);

export type RoundCountdownMessage = InferOutput<typeof RoundCountdownMessage>;

export const BetChangeMessage = intersect([
  object({
    type: literal('bet-change'),
  }),
  BetData,
]);

export type BetChangeMessage = InferOutput<typeof BetChangeMessage>;

export const BalanceUpdateMessage = intersect([
  object({
    type: literal('balance-update'),
  }),
  BalanceData,
]);

export type BalanceUpdateMessage = InferOutput<typeof BalanceUpdateMessage>;

export const WinMessage = intersect([
  object({
    type: literal('win'),
  }),
  TotalWinData,
  TicketWinListData,
]);

export type WinMessage = InferOutput<typeof WinMessage>;

export const RoomMessage = union([
  TicketCreateMessage,
  TicketCancelMessage,
  RoundStartMessage,
  RoundCompleteMessage,
  RoundProcessMessage,
  RoundCountdownMessage,
]);

export type RoomMessage = InferOutput<typeof RoomMessage>;

export const UserMessage = union([BetChangeMessage, BalanceUpdateMessage, WinMessage]);

export type UserMessage = InferOutput<typeof UserMessage>;
