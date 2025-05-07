import { ITicket } from '@ui/helpers';
import { createContext, useContext } from 'react';

export interface TicketService {
  get tickets(): readonly ITicket[];
  get addTickets(): (...tickets: ITicket[]) => void;
  get removeTickets(): (...ticketIds: string[]) => void;
  get clearTickets(): () => void;
}

export const TicketServiceContext = createContext<TicketService | null>(null);

export const useTicketService = (): TicketService => {
  const ticketService = useContext(TicketServiceContext);
  if (!ticketService) {
    throw new Error('ticketService не определен');
  }
  return ticketService;
};
