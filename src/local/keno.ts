import { Emitter, type IEmitter } from '@ksv90/decorators';
import { Ticket } from '@ui/helpers';

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
  #store = {
    balance: 0,
    totalBet: 0,
    tickets: new Map<string, Ticket>(),
  };

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

  roundStart(): void {
    this.emit('roundStarted');
  }

  roundComplete(numbers: readonly number[]): void {
    this.clearTickets();
    this.emit('roundCompleted', numbers);
  }
}
