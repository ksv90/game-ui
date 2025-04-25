import { ServerTicket, SessionResponse, TicketCancelResponse, TicketCreateResponse } from '@ui/schemes';

import { MessengerMock, ROOM_CHANNEL, USER_CHANNEL } from './messenger';

export interface ConnectorMockServer {
  get balance(): number;
  get bet(): number;
  get tickets(): Iterable<ServerTicket>;
  get roundNumbers(): Iterable<number>;
  ticketCreate(bet: number, numbers: readonly number[]): ServerTicket;
  ticketCancel(ticketId: string): ServerTicket;
}

export class ConnectorMock {
  #messenger: MessengerMock;

  #server: ConnectorMockServer;

  constructor(messenger: MessengerMock, server: ConnectorMockServer) {
    this.#messenger = messenger;
    this.#server = server;
  }

  getSessionData(): Promise<Response> {
    const response = this.#createResponse({
      balance: this.#server.balance,
      bet: this.#server.bet,
      room_channel: ROOM_CHANNEL,
      user_channel: USER_CHANNEL,
      tickets: Array.from(this.#server.tickets),
      roundNumbers: Array.from(this.#server.roundNumbers),
    });

    return Promise.resolve(response);
  }

  ticketCreate(bet: number, numbers: readonly number[]): Promise<Response> {
    const ticket = this.#server.ticketCreate(bet, numbers);

    const { balance } = this.#server;

    this.#messenger.sendCreatedTicket(ticket);
    this.#messenger.sendBalanceUpdate(balance);
    this.#messenger.sendBetChange(bet);

    const response = this.#createResponse({ balance, ticket });

    return Promise.resolve(response);
  }

  ticketCancel(ticketId: string): Promise<Response> {
    this.#server.ticketCancel(ticketId);

    const { balance } = this.#server;

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
