import { PropsWithChildren, useMemo } from 'react';

import { TicketCancelResponse, TicketCreateResponse } from '../../schemes';
import { ticketTransform } from '../../transforms';
import { Ticket } from '../../types';
import { ConnectorService, ConnectorServiceContext } from './connector-service.context';

export interface ConnectorServiceConnector {
  ticketCreate(bet: number, numbers: readonly number[]): Promise<TicketCreateResponse>;
  ticketCancel(ticketId: string): Promise<TicketCancelResponse>;
}

export interface ConnectorServiceGame {
  addTickets(...tickets: Ticket[]): void;
  removeTickets(...ticketIds: string[]): void;
  updateBalance(value: number): void;
}

export interface ConnectorServiceProviderProps {
  readonly connector: ConnectorServiceConnector;
  readonly game: ConnectorServiceGame;
}

const errorHandler = (error: unknown) => {
  throw error;
};

export const ConnectorServiceProvider = (props: PropsWithChildren<ConnectorServiceProviderProps>) => {
  const { children, connector, game } = props;
  const connectorService = useMemo<ConnectorService>(
    () => ({
      ticketCreate(bet, numbers) {
        connector
          .ticketCreate(bet, numbers)
          .then(({ ticket, balance }) => {
            game.updateBalance(balance);
            game.addTickets(ticketTransform(ticket));
          })
          .catch(errorHandler);
      },
      ticketCancel(ticketId) {
        connector
          .ticketCancel(ticketId)
          .then(({ ticketId, balance }) => {
            game.updateBalance(balance);
            game.removeTickets(ticketId);
          })
          .catch(errorHandler);
      },
    }),
    [connector, game],
  );

  return <ConnectorServiceContext.Provider value={connectorService}>{children}</ConnectorServiceContext.Provider>;
};
