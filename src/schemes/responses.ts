import { InferOutput, intersect } from '@valibot/valibot';

import { BalanceData, BallListData, BetData, ChannelData, TicketData, TicketIdData, TicketListData } from './common';

export const SessionResponse = intersect([BalanceData, ChannelData, BetData, TicketListData, BallListData]);

export type SessionResponse = InferOutput<typeof SessionResponse>;

export const TicketCreateResponse = intersect([TicketData, BalanceData]);

export type TicketCreateResponse = InferOutput<typeof TicketCreateResponse>;

export const TicketCancelResponse = intersect([TicketIdData, BalanceData]);

export type TicketCancelResponse = InferOutput<typeof TicketCancelResponse>;
