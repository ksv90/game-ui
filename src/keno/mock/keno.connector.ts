import { IServerTicket, SpotIdList } from '@ui/helpers';
import { SessionResponse, TicketCancelResponse, TicketCreateResponse } from '@ui/schemes';

import { IKenoConnector } from '../keno.types';
import { KenoMessengerMock, ROOM_CHANNEL, USER_CHANNEL } from './keno.messenger';

export interface KenoConnectorMockServer {
  get balance(): number;
  get bet(): number;
  get tickets(): Iterable<IServerTicket>;
  get balls(): Iterable<number>;
  ticketCreate(bet: number, spots: SpotIdList): IServerTicket;
  ticketCancel(ticketId: string): IServerTicket;
}

export class KenoConnectorMock implements IKenoConnector {
  #messenger: KenoMessengerMock;

  #server: KenoConnectorMockServer;

  constructor(messenger: KenoMessengerMock, server: KenoConnectorMockServer) {
    this.#messenger = messenger;
    this.#server = server;
  }

  getSessionData(): Promise<SessionResponse> {
    const sessionResponse = {
      balance: this.#server.balance,
      bet: this.#server.bet,
      roomChannel: ROOM_CHANNEL,
      userChannel: USER_CHANNEL,
      tickets: Array.from(this.#server.tickets),
      balls: Array.from(this.#server.balls),
    } satisfies SessionResponse;

    return Promise.resolve(sessionResponse);
  }

  ticketCreate(bet: number, spots: SpotIdList): Promise<TicketCreateResponse> {
    const ticket = this.#server.ticketCreate(bet, spots);

    const { balance } = this.#server;

    this.#messenger.sendCreatedTicket(ticket);
    this.#messenger.sendBalanceUpdate(balance);
    this.#messenger.sendBetChange(bet);

    const ticketCancelResponse = {
      ticket,
      balance,
    } satisfies TicketCreateResponse;

    return Promise.resolve(ticketCancelResponse);
  }

  ticketCancel(ticketId: string): Promise<TicketCancelResponse> {
    this.#server.ticketCancel(ticketId);

    const { balance } = this.#server;

    this.#messenger.sendCancelledTicket(ticketId);
    this.#messenger.sendBalanceUpdate(balance);

    const ticketCancelResponse = {
      ticketId,
      balance,
    } satisfies TicketCancelResponse;

    return Promise.resolve(ticketCancelResponse);
  }
}
