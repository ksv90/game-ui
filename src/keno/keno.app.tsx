import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { IEmitterLite } from '@ksv90/decorators';
import { Ticket } from '@ui/helpers';
import {
  BalanceServiceProvider,
  BetServiceProvider,
  ColorModeProvider,
  ConnectorServiceProvider,
  ErrorBoundary,
  RoomMessagesProvider,
  StateServiceProvider,
  TicketServiceProvider,
  UserMessagesProvider,
} from '@ui/providers';
import type { Centrifuge } from 'centrifuge';
import { JSX, useEffect, useState } from 'react';

export interface GameEvents {
  balanceUpdated: [value: number];
  totalBetChanged: [value: number];
  ticketAdded: [ticket: Ticket];
  ticketRemoved: [ticketId: string];
  ticketsCleared: [];
  roundStarted: [];
  roundCompleted: [numbers: readonly number[]];
}

export interface KenoGame extends IEmitterLite<GameEvents> {
  updateBalance(value: number): void;
  changeBet(value: number): void;

  addTickets(...tickets: Ticket[]): void;
  removeTickets(...ticketIds: string[]): void;
  clearTickets(): void;

  roundStart(): void;
  roundComplete(numbers: readonly number[]): void;
}

export interface KenoConnector {
  getSessionData(): Promise<Response>;
  ticketCreate(bet: number, numbers: readonly number[]): Promise<Response>;
  ticketCancel(ticketId: string): Promise<Response>;
}

export interface KenoProps {
  readonly game: KenoGame;
  readonly connector: KenoConnector;
  readonly centrifuge: Centrifuge;
  readonly ui?: JSX.Element;
  readonly rules?: JSX.Element;
}

export function KenoApp({ game, connector, centrifuge, ui, rules }: KenoProps) {
  const [userChannel, setUserChannel] = useState('');
  const [roomChannel, setRoomChannel] = useState('');
  const [rulesOpen] = useState(false);

  useEffect(() => {
    centrifuge.connect();
    return () => {
      centrifuge.disconnect();
    };
  }, [centrifuge]);

  const stateChangeHandler = (state: { room_channel: string; user_channel: string }) => {
    const { room_channel, user_channel } = state;
    setRoomChannel(room_channel);
    setUserChannel(user_channel);
  };

  return (
    <ErrorBoundary>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <ConnectorServiceProvider game={game} connector={connector} onStateChange={stateChangeHandler}>
            <UserMessagesProvider game={game} centrifuge={centrifuge} channel={userChannel}>
              <RoomMessagesProvider game={game} centrifuge={centrifuge} channel={roomChannel}>
                <TicketServiceProvider game={game}>
                  <BalanceServiceProvider game={game}>
                    <BetServiceProvider game={game}>
                      <StateServiceProvider game={game} state="pending">
                        {ui && <div>{ui}</div>}
                        {rules && rulesOpen && <div>{rules}</div>}
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
