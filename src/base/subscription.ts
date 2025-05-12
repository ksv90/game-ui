import { ISubscription, ISubscriptionEvents } from '@game-ui/base';
import { Emitter, IEmitter } from '@ksv90/decorators';

export type PublishResultMock = object;

export interface SubscribedContextMock {
  channel: string;
}

export interface UnsubscribedContextMock {
  channel: string;
}

export interface SubscriptionMockEvents extends ISubscriptionEvents {
  subscribed: [ctx: SubscribedContextMock];
  unsubscribed: [ctx: UnsubscribedContextMock];
}

export interface SubscriptionMock extends IEmitter<SubscriptionMockEvents> {}

export
@Emitter()
class SubscriptionMock implements ISubscription {
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
