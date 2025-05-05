import { IServerTicket } from './server.types';
import { ITicket } from './types';

export const ticketTransform = (serverTicket: IServerTicket): ITicket => ({
  ticketId: serverTicket.ticketId,
  bet: serverTicket.bet,
  spots: serverTicket.spots,
});
