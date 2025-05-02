export type Listener<TData extends unknown[]> = (...eventData: TData) => void;

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

export interface IEmitterLite<TEvents extends Record<keyof TEvents, unknown[]>> {
  on<TEventName extends keyof TEvents>(eventName: TEventName, listener: Listener<TEvents[TEventName]>): this;
  once<TEventName extends keyof TEvents>(eventName: TEventName, listener: Listener<TEvents[TEventName]>): this;
  off<TEventName extends keyof TEvents>(eventName: TEventName, listener: Listener<TEvents[TEventName]>): this;
}

export interface ITicket {
  readonly ticketId: string;
  readonly bet: number;
  readonly numbers: readonly number[];
  readonly win: number;
  readonly coincidences: readonly number[];
}
