import { errorHandler } from '@game-ui/base';
import { ITicket, SpotIdList, ticketTransform } from '@game-ui/helpers';
import { SessionResponse, TicketCancelResponse, TicketCreateResponse } from '@game-ui/schemes';
import { JSX, PropsWithChildren, useMemo } from 'react';

import { ConnectorService, ConnectorServiceContext } from './connector-service.context';

export interface ConnectorServiceConnector {
  getSessionData(): Promise<SessionResponse>;
  ticketCreate(bet: number, spots: SpotIdList): Promise<TicketCreateResponse>;
  ticketCancel(ticketId: string): Promise<TicketCancelResponse>;
}

export interface ConnectorServiceGame {
  updateBalance(value: number): void;
  changeBet(value: number): void;

  addTickets(...tickets: ITicket[]): void;
  removeTickets(...ticketIds: string[]): void;

  addBalls(...values: number[]): void;
}

export interface IConnectorServiceData {
  readonly userChannel: string;
  readonly roomChannel: string;
}

export interface ConnectorServiceProviderProps {
  readonly connector: ConnectorServiceConnector;
  readonly game: ConnectorServiceGame;
  readonly onDataChange?: (connectorServiceData: IConnectorServiceData) => void;
}

export const ConnectorServiceProvider = (props: PropsWithChildren<ConnectorServiceProviderProps>): JSX.Element => {
  const { children, connector, game, onDataChange } = props;
  const connectorService = useMemo<ConnectorService>(
    () => ({
      getSessionData() {
        connector
          .getSessionData()
          .then((sessionData) => {
            const { bet, balance, tickets, balls, roomChannel, userChannel } = sessionData;
            game.updateBalance(balance);
            game.changeBet(bet);
            game.addTickets(...tickets.map(ticketTransform));
            game.addBalls(...balls);
            onDataChange?.({ roomChannel, userChannel });
          })
          .catch(errorHandler);
      },
      ticketCreate(bet, spots) {
        connector
          .ticketCreate(bet, spots)
          .then(({ ticket, balance }) => {
            game.updateBalance(balance);
            game.addTickets(ticketTransform(ticket));
          })
          .catch(errorHandler);
      },
      ticketCancel(ticketId) {
        connector
          .ticketCancel(ticketId)
          .then((data) => {
            game.updateBalance(data.balance);
            game.removeTickets(data.ticketId);
          })
          .catch(errorHandler);
      },
    }),
    [connector, game, onDataChange],
  );

  return <ConnectorServiceContext.Provider value={connectorService}>{children}</ConnectorServiceContext.Provider>;
};
