import { createContext, useContext } from 'react';

import { Ticket } from '../../types';

export interface TicketService {
  get tickets(): readonly Ticket[];
  get addTickets(): (...tickets: Ticket[]) => void;
  get removeTickets(): (...ticketIds: string[]) => void;
  get clearTickets(): () => void;
}

export const TicketServiceContext = createContext<TicketService | null>(null);

export const useTicketService = () => {
  const ticketService = useContext(TicketServiceContext);
  if (!ticketService) {
    throw new Error('ticketService не определен');
  }
  return ticketService;
};
