import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
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
  WindowServiceProvider,
  WinServiceProvider,
} from '@game-ui/providers';
import { JSX, useEffect, useState } from 'react';

import { IKenoConnector, IKenoGame, IKenoReceiver } from './keno.types';

export interface KenoProps {
  readonly game: IKenoGame;
  readonly connector: IKenoConnector;
  readonly receiver: IKenoReceiver;
  readonly ui?: JSX.Element;
  readonly rules?: JSX.Element; // не используется
}

export function KenoApp(props: KenoProps): JSX.Element {
  const { game, connector, receiver, ui } = props;

  const [userChannel, setUserChannel] = useState('');
  const [roomChannel, setRoomChannel] = useState('');
  // const [rulesOpen] = useState(false);

  useEffect(() => {
    game.start();
  }, [game]);

  useEffect(() => {
    receiver.connect();
    return () => {
      receiver.disconnect();
    };
  }, [receiver]);

  const dataChangeHandler = (data: IConnectorServiceData): void => {
    setRoomChannel(data.roomChannel);
    setUserChannel(data.userChannel);
  };

  const errorHandler = (): void => {
    game.stop();
  };

  return (
    <ErrorBoundary onError={errorHandler}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <WindowServiceProvider>
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
                                {ui}
                                {/* {rulesOpen && rules} */}
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
          </WindowServiceProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}
