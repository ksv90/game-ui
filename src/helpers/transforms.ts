import { IServerTicket, ITicket } from './types';

export const ticketTransform = (serverTicket: IServerTicket): ITicket => ({
  ticketId: serverTicket.ticketId,
  bet: serverTicket.bet,
  spots: serverTicket.spots,
});
