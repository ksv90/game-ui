import { TicketData, TicketWinData, UserWinListData } from '@ui/schemes';

export type Listener<TData extends unknown[]> = (...eventData: TData) => void;

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

export interface IEmitterLite<TEvents extends Record<keyof TEvents, unknown[]>> {
  on<TEventName extends keyof TEvents>(eventName: TEventName, listener: Listener<TEvents[TEventName]>): this;
  once<TEventName extends keyof TEvents>(eventName: TEventName, listener: Listener<TEvents[TEventName]>): this;
  off<TEventName extends keyof TEvents>(eventName: TEventName, listener: Listener<TEvents[TEventName]>): this;
}

export type ISpotIdList = readonly number[];

export type IBallList = readonly number[];

export interface ITicket {
  readonly ticketId: string;
  readonly bet: number;
  readonly spots: ISpotIdList;
}

export interface ITicketWin {
  readonly ticketId: string;
  readonly win: number;
  readonly hits: readonly number[];
}

export interface IUserWin {
  readonly userName: string;
  readonly totalWin: number;
}

export type IServerTicket = TicketData['ticket'];

export type IServerTicketWin = TicketWinData['ticketWin'];

export type IServerUserWin = UserWinListData['userWins'];
