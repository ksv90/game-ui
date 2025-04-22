import { ServerTicket, SessionResponse, TicketCancelResponse, TicketCreateResponse } from '@ui/schemes';

import { Messenger, ROOM_CHANNEL, USER_CHANNEL } from './messenger';

export interface ConnectorContext {
  get balance(): number;
  get bet(): number;
  get tickets(): Iterable<ServerTicket>;
  get roundNumbers(): Iterable<number>;
  ticketCreate(bet: number, numbers: readonly number[]): ServerTicket;
  ticketCancel(ticketId: string): void;
}

export class Connector {
  #messenger: Messenger;

  #context: ConnectorContext;

  constructor(messenger: Messenger, context: ConnectorContext) {
    this.#messenger = messenger;
    this.#context = context;
  }

  getSessionData(): Promise<Response> {
    const response = this.#createResponse({
      balance: this.#context.balance,
      bet: this.#context.bet,
      room_channel: ROOM_CHANNEL,
      user_channel: USER_CHANNEL,
      tickets: Array.from(this.#context.tickets),
      roundNumbers: Array.from(this.#context.roundNumbers),
    });

    return Promise.resolve(response);
  }

  ticketCreate(bet: number, numbers: readonly number[]): Promise<Response> {
    const ticket = this.#context.ticketCreate(bet, numbers);

    const { balance } = this.#context;

    this.#messenger.sendCreatedTicket(ticket);
    this.#messenger.sendBalanceUpdate(balance);
    this.#messenger.sendBetChange(bet);

    const response = this.#createResponse({ balance, ticket });

    return Promise.resolve(response);
  }

  ticketCancel(ticketId: string): Promise<Response> {
    this.#context.ticketCancel(ticketId);

    const { balance } = this.#context;

    this.#messenger.sendCancelledTicket(ticketId);
    this.#messenger.sendBalanceUpdate(balance);

    const response = this.#createResponse({ balance, ticketId });

    return Promise.resolve(response);
  }

  #createResponse(body: SessionResponse | TicketCreateResponse | TicketCancelResponse): Response {
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
