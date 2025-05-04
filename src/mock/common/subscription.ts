import { Emitter, IEmitter } from '@ksv90/decorators';
import { IReceiverSubscription, ReceiverSubscriptionEvents } from '@ui/helpers';

export type PublishResultMock = object;

export interface SubscribedContextMock {
  channel: string;
}

export interface UnsubscribedContextMock {
  channel: string;
}

export interface SubscriptionMockEvents extends ReceiverSubscriptionEvents {
  subscribed: [ctx: SubscribedContextMock];
  unsubscribed: [ctx: UnsubscribedContextMock];
}

export interface SubscriptionMock extends IEmitter<SubscriptionMockEvents> {}

export
@Emitter()
class SubscriptionMock implements IReceiverSubscription {
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

  async publish(data: unknown): Promise<PublishResultMock> {
    await Promise.resolve();
    setTimeout(() => {
      this.emit('publication', { channel: this.#channel, data });
    }, 0);
    return {};
  }
}
