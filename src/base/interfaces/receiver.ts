import { IEmitterLite } from '../types';

export type ReceiverState = 'disconnected' | 'connecting' | 'connected';

export interface IPublicationContext {
  channel: string;
  data: unknown;
}

export interface IStateContext {
  newState: ReceiverState;
  oldState: ReceiverState;
}

export interface ISubscriptionEvents {
  publication: [ctx: IPublicationContext];
}

export interface IReceiverEvents {
  state: [ctx: IStateContext];
}

export interface ISubscription extends IEmitterLite<ISubscriptionEvents> {
  subscribe(): void;
  unsubscribe(): void;
}

export interface IReceiver extends IEmitterLite<IReceiverEvents> {
  get state(): ReceiverState;
  connect(): void;
  disconnect(): void;
  newSubscription(channel: string): ISubscription;
}
