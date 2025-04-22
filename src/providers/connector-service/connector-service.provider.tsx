import { errorHandler, getJsonData, Ticket, ticketTransform, validateData } from '@ui/helpers';
import { SessionResponse, TicketCancelResponse, TicketCreateResponse } from '@ui/schemes';
import { PropsWithChildren, useMemo } from 'react';

import { ConnectorService, ConnectorServiceContext } from './connector-service.context';

export interface ConnectorServiceConnector {
  getSessionData(): Promise<Response>;
  ticketCreate(bet: number, numbers: readonly number[]): Promise<Response>;
  ticketCancel(ticketId: string): Promise<Response>;
}

export interface ConnectorServiceGame {
  updateBalance(value: number): void;
  changeBet(value: number): void;

  addTickets(...tickets: Ticket[]): void;
  removeTickets(...ticketIds: string[]): void;

  addRoundNumbers(...values: number[]): void;
}

export interface ConnectorServiceProviderProps {
  readonly connector: ConnectorServiceConnector;
  readonly game: ConnectorServiceGame;
  readonly onStateChange?: (state: { room_channel: string; user_channel: string }) => void;
}

export const ConnectorServiceProvider = (props: PropsWithChildren<ConnectorServiceProviderProps>) => {
  const { children, connector, game, onStateChange } = props;
  const connectorService = useMemo<ConnectorService>(
    () => ({
      getSessionData() {
        connector
          .getSessionData()
          .then(getJsonData)
          .then(validateData(SessionResponse))
          .then((sessionData) => {
            const { bet, balance, tickets, roundNumbers, room_channel, user_channel } = sessionData;
            game.updateBalance(balance);
            game.changeBet(bet);
            game.addTickets(...tickets.map(ticketTransform));
            game.addRoundNumbers(...roundNumbers);
            onStateChange?.({ room_channel, user_channel });
          })
          .catch(errorHandler);
      },
      ticketCreate(bet, numbers) {
        connector
          .ticketCreate(bet, numbers)
          .then(getJsonData)
          .then(validateData(TicketCreateResponse))
          .then(({ ticket, balance }) => {
            game.updateBalance(balance);
            game.addTickets(ticketTransform(ticket));
          })
          .catch(errorHandler);
      },
      ticketCancel(ticketId) {
        connector
          .ticketCancel(ticketId)
          .then(getJsonData)
          .then(validateData(TicketCancelResponse))
          .then(({ ticketId, balance }) => {
            game.updateBalance(balance);
            game.removeTickets(ticketId);
          })
          .catch(errorHandler);
      },
    }),
    [connector, game, onStateChange],
  );

  return <ConnectorServiceContext.Provider value={connectorService}>{children}</ConnectorServiceContext.Provider>;
};
