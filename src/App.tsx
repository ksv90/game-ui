import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { type IEmitterLite } from '@ksv90/decorators';
import { type Centrifuge } from 'centrifuge';
import { PropsWithChildren, useEffect, useState } from 'react';

import { ColorModeProvider, ErrorBoundary, RoomMessagesProvider, UserMessagesProvider } from './providers';
import { SessionResponse, TicketCancelResponse, TicketCreateResponse } from './schemes';
import { BalanceServiceProvider, BetServiceProvider, ConnectorServiceProvider, StateServiceProvider, TicketServiceProvider } from './services';
import { ticketTransform } from './transforms';
import { Ticket } from './types';

export interface GameEvents {
  balanceUpdated: [value: number];
  totalBetChanged: [value: number];
  ticketAdded: [ticket: Ticket];
  ticketRemoved: [ticketId: string];
  ticketsCleared: [];
  roundStarted: [];
  roundCompleted: [numbers: readonly number[]];
}

export interface AppGame extends IEmitterLite<GameEvents> {
  updateBalance(value: number): void;
  changeBet(value: number): void;

  addTickets(...tickets: Ticket[]): void;
  removeTickets(...ticketIds: string[]): void;
  clearTickets(): void;

  roundStart(): void;
  roundComplete(numbers: readonly number[]): void;
}

export interface AppConnector {
  getSessionData(): Promise<SessionResponse>;
  ticketCreate(bet: number, numbers: readonly number[]): Promise<TicketCreateResponse>;
  ticketCancel(ticketId: string): Promise<TicketCancelResponse>;
}

export interface AppProps {
  readonly game: AppGame;
  readonly connector: AppConnector;
  readonly centrifuge: Centrifuge;
}

export function App({ children, game, connector, centrifuge }: PropsWithChildren<AppProps>) {
  const [userChannel, setUserChannel] = useState('');
  const [roomChannel, setRoomChannel] = useState('');

  useEffect(() => {
    centrifuge.connect();
    return () => {
      centrifuge.disconnect();
    };
  }, [centrifuge]);

  useEffect(() => {
    connector
      .getSessionData()
      .then(({ bet, balance, tickets, room_channel, user_channel }) => {
        setRoomChannel(room_channel);
        setUserChannel(user_channel);
        game.updateBalance(balance);
        game.changeBet(bet);
        game.addTickets(...tickets.map(ticketTransform));
      })
      .catch((error: unknown) => {
        throw error;
      });
  }, [connector, game]);

  return (
    <ErrorBoundary>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <ConnectorServiceProvider game={game} connector={connector}>
            <UserMessagesProvider game={game} centrifuge={centrifuge} channel={userChannel}>
              <RoomMessagesProvider game={game} centrifuge={centrifuge} channel={roomChannel}>
                <TicketServiceProvider game={game}>
                  <BalanceServiceProvider game={game}>
                    <BetServiceProvider game={game}>
                      <StateServiceProvider game={game} state="pending">
                        {children}
                      </StateServiceProvider>
                    </BetServiceProvider>
                  </BalanceServiceProvider>
                </TicketServiceProvider>
              </RoomMessagesProvider>
            </UserMessagesProvider>
          </ConnectorServiceProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}
