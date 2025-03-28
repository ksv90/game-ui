import { SessionResponse, TicketCancelResponse, TicketCreateResponse } from '../schemes';

export class Connector {
  async getSessionData(): Promise<SessionResponse> {
    return {
      balance: 5000,
      bet: 15,
      room_channel: 'room',
      user_channel: 'user',
      tickets: [],
    };
  }

  async ticketCreate(bet: number, numbers: readonly number[]): Promise<TicketCreateResponse> {
    return {
      balance: 5000,
      ticket: {
        bet: 15,
        numbers: [1, 2, 3],
        ticketId: 'ticket-id',
      },
    };
  }

  async ticketCancel(ticketId: string): Promise<TicketCancelResponse> {
    return {
      balance: 5000,
      ticketId: 'ticket-id',
    };
  }
}
