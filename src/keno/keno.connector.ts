import { Connector } from '@game-ui/base';
import { SessionResponse, TicketCancelResponse, TicketCreateResponse } from '@game-ui/schemes';
import { parse } from '@valibot/valibot';

import { IKenoConnector } from './keno.types';

export class KenoConnector extends Connector implements IKenoConnector {
  async getSessionData(): Promise<SessionResponse> {
    const response = await this.get_(`${this.serverUrl_}/game/init`);
    const sessionResponse = parse(SessionResponse, await response.json());
    return sessionResponse;
  }

  async ticketCreate(bet: number, spots: readonly number[]): Promise<TicketCreateResponse> {
    const response = await this.post_(`${this.serverUrl_}/ticket/create`, { bet, spots });
    const ticketCreateResponse = parse(TicketCreateResponse, await response.json());
    return ticketCreateResponse;
  }

  async ticketCancel(ticketId: string): Promise<TicketCancelResponse> {
    const response = await this.post_(`${this.serverUrl_}/ticket/cancel`, { ticketId });
    const ticketCancelResponse = parse(TicketCancelResponse, await response.json());
    return ticketCancelResponse;
  }
}
