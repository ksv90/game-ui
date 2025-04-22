import { ServerTicket, TicketWinData } from '@ui/schemes';

import { ConnectorContext } from './connector';
import { RoundMachineContext } from './round-machine';

const COUNTDOWN = 10;

const TOP_NUMBER = 80;

const ROUND_NUMBERS = 20;

export class Context implements RoundMachineContext, ConnectorContext {
  #mode = 0;

  #balance = 1_000;

  #bet = 10;

  #roundStarted = false;

  #countdown = COUNTDOWN;

  #roundNumbers = new Set<number>();

  #ticketMap = new Map<string, ServerTicket>();

  #payouts: Record<number, readonly number[]>;

  constructor(payouts: Record<number, readonly number[]>) {
    this.#payouts = payouts;
  }

  get mode(): number {
    return this.#mode;
  }

  get balance(): number {
    return this.#balance;
  }

  get bet(): number {
    return this.#bet;
  }

  get countdown(): number {
    return this.#countdown;
  }

  get tickets(): Iterable<ServerTicket> {
    return this.#ticketMap.values();
  }

  get roundNumbers(): Iterable<number> {
    return this.#roundNumbers.values();
  }

  countdownDecrement(): void {
    if (this.#roundStarted) {
      throw new Error('Нельзя изменить счетчик при активном раунде');
    }
    this.#countdown -= 1;
  }

  addRoundNumber(): number {
    if (!this.#roundStarted) {
      throw new Error('Нельзя добавить число в неактивный раунд');
    }
    const currentSize = this.#roundNumbers.size;
    let value = -1;
    while (this.#roundNumbers.size === currentSize) {
      value = Math.floor(Math.random() * TOP_NUMBER) + 1;
      this.#roundNumbers.add(value);
    }
    return value;
  }

  isRoundReady(): boolean {
    return this.#roundNumbers.size === ROUND_NUMBERS;
  }

  winsCalculate(): { totalWin: number; ticketWins: TicketWinData[] } {
    let totalWin = 0;
    const ticketWins = new Array<TicketWinData>();
    for (const ticket of this.#ticketMap.values()) {
      const payoutList = this.#payouts[ticket.numbers.length] ?? [];
      const coincidences = new Array<number>();
      for (let index = 0, len = ticket.numbers.length; index < len; index += 1) {
        const value = ticket.numbers[index];
        if (this.#roundNumbers.has(value)) coincidences.push(value);
      }
      const value = payoutList[coincidences.length];
      if (typeof value !== 'number') {
        throw new Error('Непредвиденная ошибка в подсчетах');
      }
      const win = value * ticket.bet;
      totalWin += win;
      ticketWins.push({ ticketId: ticket.ticketId, win, coincidences });
    }

    return { totalWin, ticketWins };
  }

  roundStart() {
    this.#roundStarted = true;
  }

  roundClose(): void {
    this.#roundStarted = false;
    this.#countdown = COUNTDOWN;
    this.#roundNumbers.clear();
    this.#ticketMap.clear();
  }

  ticketCreate(bet: number, numbers: readonly number[]): ServerTicket {
    if (this.#balance < bet) {
      throw new Error('Не хватает средств, чтобы сделать ставку');
    }

    this.#bet = bet;
    this.#balance -= bet;

    const ticket = {
      bet,
      numbers: [...numbers],
      ticketId: String(Math.random() * 10),
    } satisfies ServerTicket;

    this.#ticketMap.set(ticket.ticketId, ticket);
    return ticket;
  }

  ticketCancel(ticketId: string): void {
    const ticket = this.#ticketMap.get(ticketId);
    if (!ticket) {
      throw new Error('Ticket не найден');
    }
    this.#balance += ticket.bet;
  }
}
