import { type IStorer, Storer } from '@ksv90/decorators';

import { Ticket } from '../types';

export interface KenoStore {
  readonly balance: number;
  readonly totalBet: number;
  readonly tickets: Map<string, Ticket>;
}

export interface KenoContext extends IStorer<KenoStore> {}

export
@Storer({ balance: 0, totalBet: 0, tickets: new Map() } satisfies KenoStore)
class KenoContext {
  addTicket(ticket: Ticket): void {
    const tickets = this.get('tickets');
    tickets.set(ticket.ticketId, ticket);
  }

  removeTicket(ticketId: string): void {
    const tickets = this.get('tickets');
    tickets.delete(ticketId);
  }

  clearTickets(): void {
    const tickets = this.get('tickets');
    tickets.clear();
  }
}
