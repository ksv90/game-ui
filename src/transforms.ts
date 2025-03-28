import { ServerTicket } from './schemes';
import { Ticket } from './types';

export const ticketTransform = (serverTicket: ServerTicket): Ticket => ({
  ticketId: serverTicket.ticketId,
  bet: serverTicket.bet,
  numbers: serverTicket.numbers,
  win: serverTicket.win ?? 0,
});
