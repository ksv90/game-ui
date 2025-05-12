import { BallList, ITicket, ITicketWin, IUserWin } from '@game-ui/helpers';
import { Emitter, type IEmitter } from '@ksv90/decorators';

import { IKenoGame, IKenoGameEvents } from '../keno.types';

export interface IKenoGameMockEvents extends IKenoGameEvents {
  ticketWin: [ticket: ITicket & ITicketWin];
}

export interface KenoGameMock extends IEmitter<IKenoGameMockEvents> {}

export
@Emitter()
class KenoGameMock implements IKenoGame {
  #store = {
    balance: 0,
    totalBet: 0,
    countdown: 0,
    tickets: new Map<string, ITicket>(),
    balls: new Set<number>(),
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

  roundComplete(balls: BallList, userWins: readonly IUserWin[]): void {
    this.clearTickets();
    this.clearBalls();
    this.emit('roundCompleted', { balls, userWins });
  }

  setCountdown(value: number): void {
    this.#store.countdown = value;
    this.emit('countdown', value);
  }

  addBalls(...values: number[]): void {
    for (const value of values) {
      if (this.#store.balls.has(value)) continue;
      this.#store.balls.add(value);
      this.emit('ballAdded', value);
    }
  }

  clearBalls(): void {
    this.#store.balls.clear();
    this.emit('ballsCleared');
  }

  ticketWins(...ticketWins: ITicketWin[]): void {
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
