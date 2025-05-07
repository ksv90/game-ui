import { IServerTicket, IServerTicketWin } from '@ui/helpers';
import { TicketWinListData, TotalWinData } from '@ui/schemes';

import { KenoConnectorMockServer } from './keno.connector';
import { KenoMachineMockContext } from './keno.machine';

const COUNTDOWN = 10;

const TOP_NUMBER = 80;

const ROUND_NUMBERS = 20;

interface KenoServerMockStore {
  mode: number;
  balance: number;
  bet: number;
  roundStarted: boolean;
  countdown: number;
  balls: Set<number>;
  ticketMap: Map<string, IServerTicket>;
  payouts: Record<number, readonly number[]>;
}

export class KenoServerMock implements KenoMachineMockContext, KenoConnectorMockServer {
  #store: KenoServerMockStore;

  constructor(payouts: Record<number, readonly number[]>) {
    this.#store = {
      payouts,
      mode: 0,
      balance: 1_000,
      bet: 10,
      roundStarted: false,
      countdown: COUNTDOWN,
      balls: new Set<number>(),
      ticketMap: new Map<string, IServerTicket>(),
    };
  }

  get mode(): number {
    return this.#store.mode;
  }

  get balance(): number {
    return this.#store.balance;
  }

  get bet(): number {
    return this.#store.bet;
  }

  get countdown(): number {
    return this.#store.countdown;
  }

  get tickets(): Iterable<IServerTicket> {
    return this.#store.ticketMap.values();
  }

  get balls(): Iterable<number> {
    return this.#store.balls.values();
  }

  countdownDecrement(): void {
    if (this.#store.roundStarted) {
      throw new Error('Нельзя изменить счетчик при активном раунде');
    }
    this.#store.countdown -= 1;
  }

  addBall(): number {
    if (!this.#store.roundStarted) {
      throw new Error('Нельзя добавить число в неактивный раунд');
    }
    const currentSize = this.#store.balls.size;
    let value = -1;
    while (this.#store.balls.size === currentSize) {
      value = Math.floor(Math.random() * TOP_NUMBER) + 1;
      this.#store.balls.add(value);
    }
    return value;
  }

  isRoundReady(): boolean {
    return this.#store.balls.size === ROUND_NUMBERS;
  }

  winsCalculate(): TotalWinData & TicketWinListData {
    let totalWin = 0;
    const ticketWins = new Array<IServerTicketWin>();
    for (const ticket of this.#store.ticketMap.values()) {
      const payoutList = this.#store.payouts[ticket.spots.length] ?? [];
      const hits = new Array<number>();
      for (let index = 0, len = ticket.spots.length; index < len; index += 1) {
        const value = ticket.spots[index];
        if (this.#store.balls.has(value)) hits.push(value);
      }
      const value = payoutList[hits.length];
      if (typeof value !== 'number') {
        throw new Error('Непредвиденная ошибка в подсчетах');
      }
      const win = value * ticket.bet;
      totalWin += win;
      ticketWins.push({ ticketId: ticket.ticketId, win, hits });
    }

    return { totalWin, ticketWins };
  }

  roundStart(): void {
    this.#store.roundStarted = true;
  }

  roundClose(): void {
    this.#store.roundStarted = false;
    this.#store.countdown = COUNTDOWN;
    this.#store.balls.clear();
    this.#store.ticketMap.clear();
  }

  ticketCreate(bet: number, spots: readonly number[]): IServerTicket {
    if (this.#store.balance < bet) {
      throw new Error('Не хватает средств, чтобы сделать ставку');
    }

    this.#store.bet = bet;
    this.#store.balance -= bet;

    const ticket = {
      bet,
      spots: [...spots],
      // eslint-disable-next-line no-magic-numbers
      ticketId: String(Math.random() * 10),
    } satisfies IServerTicket;

    this.#store.ticketMap.set(ticket.ticketId, ticket);
    return ticket;
  }

  ticketCancel(ticketId: string): IServerTicket {
    const ticket = this.#store.ticketMap.get(ticketId);
    if (!ticket) {
      throw new Error('Ticket не найден');
    }
    this.#store.ticketMap.delete(ticketId);
    this.#store.balance += ticket.bet;
    return ticket;
  }
}
