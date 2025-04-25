import { Ticket, ticketTransform } from '@ui/helpers';
import { ServerTicket } from '@ui/schemes';
import { PropsWithChildren, useEffect, useMemo, useReducer } from 'react';

import { TicketService, TicketServiceContext } from './ticket-service.context';
import { ticketServiceReducer } from './ticket-service.reducer';

export interface TicketServiceGame {
  on(eventName: 'ticketAdded', listener: (ticket: Ticket) => void): this;
  on(eventName: 'ticketRemoved', listener: (ticketId: string) => void): this;
  on(eventName: 'ticketsCleared', listener: () => void): this;

  off(eventName: 'ticketAdded', listener: (ticket: Ticket) => void): this;
  off(eventName: 'ticketRemoved', listener: (ticketId: string) => void): this;
  off(eventName: 'ticketsCleared', listener: () => void): this;

  addTickets(...tickets: Ticket[]): void;
  removeTickets(...ticketIds: string[]): void;
  clearTickets(): void;
}

export interface TicketServiceProviderProps {
  readonly game: TicketServiceGame;
  readonly tickets?: readonly ServerTicket[];
}

export const TicketServiceProvider = (props: PropsWithChildren<TicketServiceProviderProps>) => {
  const { children, game } = props;

  const [tickets, dispatchTickets] = useReducer(ticketServiceReducer, props.tickets?.map(ticketTransform) ?? []);

  const ticketService = useMemo<TicketService>(
    () => ({
      tickets,
      addTickets(...tickets) {
        game.addTickets(...tickets);
      },
      removeTickets(...ticketIds) {
        game.removeTickets(...ticketIds);
      },
      clearTickets() {
        game.clearTickets();
      },
    }),
    [game, tickets],
  );

  // TODO: проверить реализацию
  useEffect(() => {
    if (props.tickets == null) return;
    dispatchTickets({ type: 'clear' });
    for (const ticket of props.tickets) {
      dispatchTickets({ type: 'add', payload: { ticket: ticketTransform(ticket) } });
    }
  }, [props.tickets]);

  useEffect(() => {
    const ticketAddHandler = (ticket: Ticket) => {
      dispatchTickets({ type: 'add', payload: { ticket } });
    };

    const ticketRemoveHandler = (ticketId: string) => {
      dispatchTickets({ type: 'remove', payload: { ticketId } });
    };

    const ticketClearHandler = () => {
      dispatchTickets({ type: 'clear' });
    };

    game.on('ticketAdded', ticketAddHandler);
    game.on('ticketRemoved', ticketRemoveHandler);
    game.on('ticketsCleared', ticketClearHandler);

    return () => {
      game.off('ticketAdded', ticketAddHandler);
      game.off('ticketRemoved', ticketRemoveHandler);
      game.off('ticketsCleared', ticketClearHandler);
    };
  }, [game]);

  return <TicketServiceContext.Provider value={ticketService}>{children}</TicketServiceContext.Provider>;
};
