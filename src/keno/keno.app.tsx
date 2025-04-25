import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { IEmitterLite, IReceiver, Ticket } from '@ui/helpers';
import {
  BalanceServiceProvider,
  BetServiceProvider,
  ColorModeProvider,
  ConnectorServiceProvider,
  CountdownServiceProvider,
  ErrorBoundary,
  RoomMessagesProvider,
  RoundNumbersServiceProvider,
  StateServiceProvider,
  TicketServiceProvider,
  UserMessagesProvider,
  WinServiceProvider,
} from '@ui/providers';
import { TicketWinData, WinData } from '@ui/schemes';
import { JSX, useEffect, useState } from 'react';

export interface KenoGameEvents {
  balanceUpdated: [value: number];
  totalBetChanged: [value: number];
  ticketAdded: [ticket: Ticket];
  ticketRemoved: [ticketId: string];
  ticketsCleared: [];
  roundStarted: [{ users: number }];
  roundCompleted: [{ roundNumbers: readonly number[]; wins: readonly WinData[] }];
  countdown: [value: number];
  roundNumberAdded: [value: number];
  roundNumberCleared: [];
  totalWin: [value: number];
}

export interface KenoGame extends IEmitterLite<KenoGameEvents> {
  start(): void;
  stop(): void;

  updateBalance(value: number): void;
  changeBet(value: number): void;

  addTickets(...tickets: Ticket[]): void;
  removeTickets(...ticketIds: string[]): void;
  ticketWins(...ticketWins: TicketWinData[]): void;
  clearTickets(): void;

  roundStart(users: number): void;
  roundComplete(roundNumbers: readonly number[], wins: readonly WinData[]): void;

  setCountdown(countdown: number): void;
  addRoundNumbers(...values: number[]): void;
  setWin(value: number): void;
}

export interface KenoConnector {
  getSessionData(): Promise<Response>;
  ticketCreate(bet: number, numbers: readonly number[]): Promise<Response>;
  ticketCancel(ticketId: string): Promise<Response>;
}

export interface KenoProps {
  readonly game: KenoGame;
  readonly connector: KenoConnector;
  readonly receiver: IReceiver;
  readonly ui?: JSX.Element;
  readonly rules?: JSX.Element;
}

export function KenoApp(props: KenoProps) {
  const { game, connector, receiver, ui, rules } = props;

  const [userChannel, setUserChannel] = useState('');
  const [roomChannel, setRoomChannel] = useState('');
  const [rulesOpen] = useState(false);

  useEffect(() => {
    game.start();
  }, [game]);

  useEffect(() => {
    receiver.connect();
    return () => {
      receiver.disconnect();
    };
  }, [receiver]);

  const stateChangeHandler = (state: { room_channel: string; user_channel: string }) => {
    const { room_channel, user_channel } = state;
    setRoomChannel(room_channel);
    setUserChannel(user_channel);
  };

  const errorHandler = () => {
    game.stop();
  };

  return (
    <ErrorBoundary onError={errorHandler}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <ConnectorServiceProvider game={game} connector={connector} onStateChange={stateChangeHandler}>
            <RoomMessagesProvider game={game} receiver={receiver} channel={roomChannel}>
              <UserMessagesProvider game={game} receiver={receiver} channel={userChannel}>
                <TicketServiceProvider game={game}>
                  <BalanceServiceProvider game={game}>
                    <BetServiceProvider game={game}>
                      <WinServiceProvider game={game}>
                        <CountdownServiceProvider game={game}>
                          <RoundNumbersServiceProvider game={game}>
                            <StateServiceProvider game={game} state="pending">
                              {ui && <div>{ui}</div>}
                              {rules && rulesOpen && <div>{rules}</div>}
                            </StateServiceProvider>
                          </RoundNumbersServiceProvider>
                        </CountdownServiceProvider>
                      </WinServiceProvider>
                    </BetServiceProvider>
                  </BalanceServiceProvider>
                </TicketServiceProvider>
              </UserMessagesProvider>
            </RoomMessagesProvider>
          </ConnectorServiceProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}
