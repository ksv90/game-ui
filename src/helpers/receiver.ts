import { IEmitterLite } from './types';

export type ReceiverState = 'disconnected' | 'connecting' | 'connected';

export interface PublicationContext {
  channel: string;
  data: unknown;
}

export interface StateContext {
  newState: ReceiverState;
  oldState: ReceiverState;
}

export interface SubscriptionEvents {
  publication: [ctx: PublicationContext];
}

export interface ReceiverEvents {
  state: [ctx: StateContext];
}

export interface ISubscription extends IEmitterLite<SubscriptionEvents> {
  subscribe(): void;
  unsubscribe(): void;
}

export interface IReceiver extends IEmitterLite<ReceiverEvents> {
  get state(): ReceiverState;
  connect(): void;
  disconnect(): void;
  newSubscription(channel: string): ISubscription;
}
