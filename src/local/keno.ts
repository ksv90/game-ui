import { Emitter, type IEmitter } from '@ksv90/decorators';
import { Ticket } from '@ui/helpers';
import { TicketWinData, WinData } from '@ui/schemes';

import { KenoGame } from '../keno';

export interface KenoEvents {
  balanceUpdated: [value: number];
  totalBetChanged: [value: number];
  ticketAdded: [ticket: Ticket];
  ticketRemoved: [ticketId: string];
  ticketsCleared: [];
  roundStarted: [{ users: number }];
  roundCompleted: [{ roundNumbers: readonly number[]; wins: readonly WinData[] }];
  countdown: [value: number];
  roundNumberAdded: [value: number];
  roundNumberCleared: [];
  totalWin: [value: number];
  ticketWin: [Ticket: Ticket];
}

export interface Keno extends IEmitter<KenoEvents> {}

export
@Emitter()
class Keno implements KenoGame {
  #store = {
    balance: 0,
    totalBet: 0,
    countdown: 0,
    tickets: new Map<string, Ticket>(),
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

  addTickets(...tickets: Ticket[]): void {
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
    for (const { ticketId, win, coincidences } of ticketWins) {
      const ticket = this.#store.tickets.get(ticketId);
      if (!ticket) {
        throw new Error(`Ticket ${ticketId} не найден`);
      }
      const winTicket = { ...ticket, win, coincidences } satisfies Ticket;
      this.#store.tickets.set(ticketId, winTicket);
      this.emit('ticketWin', winTicket);
    }
  }

  setWin(value: number): void {
    this.emit('totalWin', value);
  }
}
