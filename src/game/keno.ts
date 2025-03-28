import { Emitter, type IEmitter } from '@ksv90/decorators';

import { type Ticket } from '../types';
import { KenoContext } from './context';

export interface KenoEvents {
  balanceUpdated: [value: number];
  totalBetChanged: [value: number];
  ticketAdded: [ticket: Ticket];
  ticketRemoved: [ticketId: string];
  ticketsCleared: [];
  roundStarted: [];
  roundCompleted: [numbers: readonly number[]];
}

export interface Keno extends IEmitter<KenoEvents> {}

export
@Emitter()
class Keno {
  #context: KenoContext;

  constructor(context?: KenoContext) {
    this.#context = context ?? new KenoContext();
  }

  updateBalance(value: number): void {
    this.#context.set('balance', value);
    this.emit('balanceUpdated', value);
  }

  changeBet(value: number): void {
    this.#context.set('totalBet', value);
    this.emit('totalBetChanged', value);
  }

  addTickets(...tickets: Ticket[]): void {
    for (const ticket of tickets) {
      this.#context.addTicket(ticket);
      this.emit('ticketAdded', ticket);
    }
  }

  removeTickets(...ticketIds: string[]): void {
    for (const ticketId of ticketIds) {
      this.#context.removeTicket(ticketId);
      this.emit('ticketRemoved', ticketId);
    }
  }

  clearTickets(): void {
    this.#context.clearTickets();
    this.emit('ticketsCleared');
  }

  roundStart(): void {
    this.emit('roundStarted');
  }

  roundComplete(numbers: readonly number[]): void {
    this.clearTickets();
    this.emit('roundCompleted', numbers);
  }
}
