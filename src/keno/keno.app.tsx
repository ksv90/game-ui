import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { IBallList, IEmitterLite, IKenoConnector, IKenoReceiver, ITicket, ITicketWin, IUserWin } from '@ui/helpers';
import {
  BalanceServiceProvider,
  BallsServiceProvider,
  BetServiceProvider,
  ColorModeProvider,
  ConnectorServiceProvider,
  CountdownServiceProvider,
  ErrorBoundary,
  IConnectorServiceData,
  RoomMessagesProvider,
  StateServiceProvider,
  TicketServiceProvider,
  UserMessagesProvider,
  WinServiceProvider,
} from '@ui/providers';
import { JSX, useEffect, useState } from 'react';

export interface IKenoGameEvents {
  balanceUpdated: [value: number];
  totalBetChanged: [value: number];
  ticketAdded: [ticket: ITicket];
  ticketRemoved: [ticketId: string];
  ticketsCleared: [];
  roundStarted: [{ users: number }];
  roundCompleted: [{ balls: IBallList; userWins: readonly IUserWin[] }];
  countdown: [value: number];
  ballAdded: [value: number];
  ballsCleared: [];
  totalWin: [value: number];
}

export interface IKenoGame extends IEmitterLite<IKenoGameEvents> {
  start(): void;
  stop(): void;

  updateBalance(value: number): void;
  changeBet(value: number): void;

  addTickets(...tickets: ITicket[]): void;
  removeTickets(...ticketIds: string[]): void;
  ticketWins(...ticketWins: ITicketWin[]): void;
  clearTickets(): void;

  roundStart(users: number): void;
  roundComplete(balls: IBallList, userWins: readonly IUserWin[]): void;

  setCountdown(countdown: number): void;
  addBalls(...values: number[]): void;
  setWin(value: number): void;
}

export interface KenoProps {
  readonly game: IKenoGame;
  readonly connector: IKenoConnector;
  readonly receiver: IKenoReceiver;
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

  const dataChangeHandler = (data: IConnectorServiceData) => {
    const { roomChannel, userChannel } = data;
    setRoomChannel(roomChannel);
    setUserChannel(userChannel);
  };

  const errorHandler = () => {
    game.stop();
  };

  return (
    <ErrorBoundary onError={errorHandler}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <ConnectorServiceProvider game={game} connector={connector} onDataChange={dataChangeHandler}>
            <RoomMessagesProvider game={game} receiver={receiver} channel={roomChannel}>
              <UserMessagesProvider game={game} receiver={receiver} channel={userChannel}>
                <TicketServiceProvider game={game}>
                  <BalanceServiceProvider game={game}>
                    <BetServiceProvider game={game}>
                      <WinServiceProvider game={game}>
                        <CountdownServiceProvider game={game}>
                          <BallsServiceProvider game={game}>
                            <StateServiceProvider game={game} state="pending">
                              {ui && <div>{ui}</div>}
                              {rules && rulesOpen && <div>{rules}</div>}
                            </StateServiceProvider>
                          </BallsServiceProvider>
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
