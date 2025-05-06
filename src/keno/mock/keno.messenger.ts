import { Broadcaster, Emitter } from '@ksv90/decorators';
import { MessengerMock } from '@ui/base';
import { IServerTicket, IServerTicketWin, IServerUserWin } from '@ui/helpers';
import {
  BalanceUpdateMessage,
  BetChangeMessage,
  RoundCompleteMessage,
  RoundCountdownMessage,
  RoundProcessMessage,
  RoundStartMessage,
  TicketCancelMessage,
  TicketCreateMessage,
  WinMessage,
} from '@ui/schemes';

import { IKenoReceiver } from '../keno.types';

export const ROOM_CHANNEL = 'room-channel';

export const USER_CHANNEL = 'user-channel';

export interface KenoMessengerMockBroadcastEvents {
  balanceUpdated: number;
  totalBetChanged: number;
}

export interface KenoMessengerMock extends MessengerMock<KenoMessengerMockBroadcastEvents> {}

export
@Emitter()
@Broadcaster('messenger')
class KenoMessengerMock extends MessengerMock<KenoMessengerMockBroadcastEvents> implements IKenoReceiver {
  #balanceUpdateHandler = (balance: number) => {
    this.sendMessage_(USER_CHANNEL, { type: 'balance-update', balance } satisfies BalanceUpdateMessage);
  };

  #betChangeHandler = (bet: number) => {
    this.sendMessage_(USER_CHANNEL, { type: 'bet-change', bet } satisfies BetChangeMessage);
  };

  constructor() {
    super();
    this.subscribe('balanceUpdated', this.#balanceUpdateHandler);
    this.subscribe('totalBetChanged', this.#betChangeHandler);
  }

  sendBalanceUpdate(value: number): void {
    this.publish('balanceUpdated', value);
  }

  sendBetChange(value: number): void {
    this.publish('totalBetChanged', value);
  }

  sendWin(totalWin: number, ticketWins: IServerTicketWin[]) {
    this.sendMessage_(USER_CHANNEL, { type: 'win', totalWin, ticketWins } satisfies WinMessage);
  }

  sendCreatedTicket(ticket: IServerTicket): void {
    this.sendMessage_(ROOM_CHANNEL, { type: 'ticket-create', ticket } satisfies TicketCreateMessage);
  }

  sendCancelledTicket(ticketId: string): void {
    this.sendMessage_(ROOM_CHANNEL, { type: 'ticket-cancel', ticketId } satisfies TicketCancelMessage);
  }

  sendRoundStart(users: number): void {
    this.sendMessage_(ROOM_CHANNEL, { type: 'round-start', users } satisfies RoundStartMessage);
  }

  sendRoundComplete(balls: number[], userWins: IServerUserWin): void {
    this.sendMessage_(ROOM_CHANNEL, { type: 'round-complete', balls, userWins } satisfies RoundCompleteMessage);
  }

  sendRoundProcess(added: number, balls: number[]): void {
    this.sendMessage_(ROOM_CHANNEL, { type: 'round-process', added, balls } satisfies RoundProcessMessage);
  }

  sendRoundCountdown(countdown: number): void {
    this.sendMessage_(ROOM_CHANNEL, { type: 'round-countdown', countdown } satisfies RoundCountdownMessage);
  }
}
