import { IEmitterLite } from './types';

export type ReceiverState = 'disconnected' | 'connecting' | 'connected';

export interface ReceiverPublicationContext {
  channel: string;
  data: unknown;
}

export interface ReceiverStateContext {
  newState: ReceiverState;
  oldState: ReceiverState;
}

export interface ReceiverSubscriptionEvents {
  publication: [ctx: ReceiverPublicationContext];
}

export interface ReceiverEvents {
  state: [ctx: ReceiverStateContext];
}

export interface IReceiverSubscription extends IEmitterLite<ReceiverSubscriptionEvents> {
  subscribe(): void;
  unsubscribe(): void;
}

export interface IReceiver extends IEmitterLite<ReceiverEvents> {
  get state(): ReceiverState;
  connect(): void;
  disconnect(): void;
  newSubscription(channel: string): IReceiverSubscription;
}

export interface IKenoReceiver extends IReceiver {}
