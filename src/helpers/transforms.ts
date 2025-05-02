import { ServerTicket } from '@ui/schemes';

import { ITicket } from './types';

export const ticketTransform = (serverTicket: ServerTicket): ITicket => ({
  ticketId: serverTicket.ticketId,
  bet: serverTicket.bet,
  numbers: serverTicket.numbers,
  win: serverTicket.win ?? 0,
  coincidences: [],
});
