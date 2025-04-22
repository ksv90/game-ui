import { Emitter, IEmitter } from '@ksv90/decorators';
import { ISubscription, SubscriptionEvents as SubscriptionEventsBase } from '@ui/helpers';

export type PublishResult = object;

export interface SubscribedContext {
  channel: string;
}

export interface UnsubscribedContext {
  channel: string;
}

export interface SubscriptionEvents extends SubscriptionEventsBase {
  subscribed: [ctx: SubscribedContext];
  unsubscribed: [ctx: UnsubscribedContext];
}

export interface Subscription extends IEmitter<SubscriptionEvents> {}

export
@Emitter()
class Subscription implements ISubscription {
  #unsubscribed = false;

  #channel: string;

  constructor(channel: string) {
    this.#channel = channel;
  }

  get channel(): string {
    return this.#channel;
  }

  subscribe(): void {
    if (this.#unsubscribed) {
      throw new Error('Невозможно подписаться после отписки');
    }
    this.emit('subscribed', { channel: this.#channel });
  }

  unsubscribe(): void {
    this.#unsubscribed = true;
    this.emit('unsubscribed', { channel: this.#channel });
  }

  async publish(data: unknown): Promise<PublishResult> {
    await Promise.resolve();
    setTimeout(() => {
      this.emit('publication', { channel: this.#channel, data });
    }, 0);
    return {};
  }
}
