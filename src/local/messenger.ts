import { Broadcaster, Emitter, IBroadcaster, IEmitter } from '@ksv90/decorators';
import { IReceiver, ISubscription, ReceiverEvents, ReceiverState } from '@ui/helpers';
import {
  BalanceUpdateMessage,
  BetChangeMessage,
  RoundCompleteMessage,
  RoundCountdownMessage,
  RoundProcessMessage,
  RoundStartMessage,
  ServerTicket,
  TicketCancelMessage,
  TicketCreateMessage,
  TicketWinData,
  WinMessage,
} from '@ui/schemes';

import { Subscription, UnsubscribedContext } from './subscription';

export const ROOM_CHANNEL = 'room-channel';

export const USER_CHANNEL = 'user-channel';

export interface MessengerBroadcastEvents {
  balanceUpdated: number;
  totalBetChanged: number;
}

export interface Messenger extends IEmitter<ReceiverEvents>, IBroadcaster<MessengerBroadcastEvents> {}

export
@Emitter()
@Broadcaster('messenger')
class Messenger implements IReceiver {
  #state: ReceiverState = 'disconnected';

  #subscriptionMap = new Map<string, Subscription>();

  #unsubscribeHandler = (context: UnsubscribedContext) => {
    const subscription = this.#subscriptionMap.get(context.channel);
    if (subscription) {
      this.removeSubscription(subscription);
    }
  };

  #balanceUpdateHandler = (balance: number) => {
    this.#sendMessage(USER_CHANNEL, { type: 'balance-update', balance } satisfies BalanceUpdateMessage);
  };

  #betChangeHandler = (bet: number) => {
    this.#sendMessage(USER_CHANNEL, { type: 'bet-change', bet } satisfies BetChangeMessage);
  };

  constructor() {
    this.subscribe('balanceUpdated', this.#balanceUpdateHandler);
    this.subscribe('totalBetChanged', this.#betChangeHandler);
  }

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
      .catch((error: unknown) => {
        throw error;
      });
  }

  disconnect(): void {
    Promise.resolve()
      .then(() => {
        this.#changeState('disconnected');
      })
      .catch((error: unknown) => {
        throw error;
      });
  }

  newSubscription(channel: string): ISubscription {
    const subscription = new Subscription(channel);
    this.#subscriptionMap.set(channel, subscription);
    subscription.once('unsubscribed', this.#unsubscribeHandler);
    return subscription;
  }

  removeSubscription(subscription: Subscription): void {
    subscription.off('unsubscribed', this.#unsubscribeHandler);
    this.#subscriptionMap.delete(subscription.channel);
  }

  sendBalanceUpdate(value: number): void {
    this.publish('balanceUpdated', value);
  }

  sendBetChange(value: number): void {
    this.publish('totalBetChanged', value);
  }

  sendWin(totalWin: number, ticketWins: TicketWinData[]) {
    this.#sendMessage(USER_CHANNEL, { type: 'win', totalWin, ticketWins } satisfies WinMessage);
  }

  sendCreatedTicket(ticket: ServerTicket): void {
    this.#sendMessage(ROOM_CHANNEL, { type: 'ticket-create', ticket } satisfies TicketCreateMessage);
  }

  sendCancelledTicket(ticketId: string): void {
    this.#sendMessage(ROOM_CHANNEL, { type: 'ticket-cancel', ticketId } satisfies TicketCancelMessage);
  }

  sendRoundStart(): void {
    this.#sendMessage(ROOM_CHANNEL, { type: 'round-start' } satisfies RoundStartMessage);
  }

  sendRoundComplete(numbers: number[], wins: RoundCompleteMessage['wins']): void {
    this.#sendMessage(ROOM_CHANNEL, { type: 'round-complete', numbers, wins } satisfies RoundCompleteMessage);
  }

  sendRoundProcess(added: number, numbers: number[]): void {
    this.#sendMessage(ROOM_CHANNEL, { type: 'round-process', added, numbers } satisfies RoundProcessMessage);
  }

  sendRoundCountdown(countdown: number): void {
    this.#sendMessage(ROOM_CHANNEL, { type: 'round-countdown', countdown } satisfies RoundCountdownMessage);
  }

  #changeState(state: ReceiverState): void {
    const oldState = this.#state;
    this.#state = state;
    this.emit('state', { oldState, newState: state });
  }

  #sendMessage(channel: string, data: unknown): void {
    const subscription = this.#subscriptionMap.get(channel);
    if (!subscription) {
      throw new Error(`Канал ${channel} не найден`);
    }
    void subscription.publish(data);
  }
}
