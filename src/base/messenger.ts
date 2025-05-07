import { Broadcaster, Emitter, IBroadcaster, IEmitter } from '@ksv90/decorators';

import { IReceiver, IReceiverEvents, ReceiverState } from './interfaces';
import { SubscriptionMock, UnsubscribedContextMock } from './subscription';
import { errorHandler } from './utils';

export interface MessengerMock<TBroadcastEvents extends object = object> extends IEmitter<IReceiverEvents>, IBroadcaster<TBroadcastEvents> {}

export
@Emitter()
@Broadcaster('messenger')
abstract class MessengerMock implements IReceiver {
  protected subscriptionMap_ = new Map<string, SubscriptionMock>();

  #state: ReceiverState = 'disconnected';

  #unsubscribeHandler = (context: UnsubscribedContextMock): void => {
    const subscription = this.subscriptionMap_.get(context.channel);
    if (subscription) {
      this.removeSubscription(subscription);
    }
  };

  get state(): ReceiverState {
    return this.#state;
  }

  connect(): void {
    Promise.resolve()
      .then(() => {
        this.#changeState('connecting');
      })
      .then(() => {
        this.#changeState('connected');
      })
      .catch(errorHandler);
  }

  disconnect(): void {
    Promise.resolve()
      .then(() => {
        this.#changeState('disconnected');
      })
      .catch(errorHandler);
  }

  newSubscription(channel: string): SubscriptionMock {
    const subscription = new SubscriptionMock(channel);
    this.subscriptionMap_.set(channel, subscription);
    subscription.once('unsubscribed', this.#unsubscribeHandler);
    return subscription;
  }

  removeSubscription(subscription: SubscriptionMock): void {
    subscription.off('unsubscribed', this.#unsubscribeHandler);
    this.subscriptionMap_.delete(subscription.channel);
  }

  protected sendMessage_(channel: string, data: unknown): void {
    const subscription = this.subscriptionMap_.get(channel);
    if (!subscription) {
      throw new Error(`Канал ${channel} не найден`);
    }
    void subscription.publish(data);
  }

  #changeState(state: ReceiverState): void {
    const oldState = this.#state;
    this.#state = state;
    this.emit('state', { oldState, newState: state });
  }
}
