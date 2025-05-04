import { ISpotIdList } from '@ui/helpers';
import { SessionResponse, TicketCancelResponse, TicketCreateResponse } from '@ui/schemes';

export interface IKenoConnector {
  getSessionData(): Promise<SessionResponse>;

  ticketCreate(bet: number, spots: ISpotIdList): Promise<TicketCreateResponse>;

  ticketCancel(ticketId: string): Promise<TicketCancelResponse>;
}
