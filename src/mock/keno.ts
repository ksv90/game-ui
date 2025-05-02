import { Emitter, type IEmitter } from '@ksv90/decorators';
import { ITicket } from '@ui/helpers';
import { TicketWinData, WinData } from '@ui/schemes';

import { KenoGame, KenoGameEvents } from '../keno';

export interface KenoEvents extends KenoGameEvents {
  ticketWin: [ticket: ITicket & TicketWinData];
}

export interface KenoMock extends IEmitter<KenoEvents> {}

export
@Emitter()
class KenoMock implements KenoGame {
  #store = {
    balance: 0,
    totalBet: 0,
    countdown: 0,
    tickets: new Map<string, ITicket>(),
    roundNumbers: new Set<number>(),
  };

  start(): void {
    //
  }

  stop(): void {
    //
  }

  updateBalance(value: number): void {
    this.#store.balance = value;
    this.emit('balanceUpdated', value);
  }

  changeBet(value: number): void {
    this.#store.totalBet = value;
    this.emit('totalBetChanged', value);
  }

  addTickets(...tickets: ITicket[]): void {
    for (const ticket of tickets) {
      this.#store.tickets.set(ticket.ticketId, ticket);
      this.emit('ticketAdded', ticket);
    }
  }

  removeTickets(...ticketIds: string[]): void {
    for (const ticketId of ticketIds) {
      this.#store.tickets.delete(ticketId);
      this.emit('ticketRemoved', ticketId);
    }
  }

  clearTickets(): void {
    this.#store.tickets.clear();
    this.emit('ticketsCleared');
  }

  roundStart(users: number): void {
    this.emit('roundStarted', { users });
  }

  roundComplete(roundNumbers: readonly number[], wins: readonly WinData[]): void {
    this.clearTickets();
    this.clearRoundNumbers();
    this.emit('roundCompleted', { roundNumbers, wins });
  }

  setCountdown(value: number): void {
    this.#store.countdown = value;
    this.emit('countdown', value);
  }

  addRoundNumbers(...values: number[]): void {
    for (const value of values) {
      if (this.#store.roundNumbers.has(value)) continue;
      this.#store.roundNumbers.add(value);
      this.emit('roundNumberAdded', value);
    }
  }

  clearRoundNumbers(): void {
    this.#store.roundNumbers.clear();
    this.emit('roundNumberCleared');
  }

  ticketWins(...ticketWins: TicketWinData[]): void {
    for (const { ticketId, win, hits } of ticketWins) {
      const ticket = this.#store.tickets.get(ticketId);
      if (!ticket) {
        throw new Error(`Ticket ${ticketId} не найден`);
      }
      this.emit('ticketWin', { ...ticket, win, hits });
    }
  }

  setWin(value: number): void {
    this.emit('totalWin', value);
  }
}
