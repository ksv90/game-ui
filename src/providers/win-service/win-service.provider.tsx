import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { WinService, WinServiceContext } from './win-service.context';

export interface WinServiceGame {
  on(eventName: 'totalWin', listener: (value: number) => void): this;
  off(eventName: 'totalWin', listener: (value: number) => void): this;
  setWin(value: number): void;
}

export interface WinProviderProps {
  readonly game: WinServiceGame;
  readonly win?: number;
}

export const WinServiceProvider = (props: PropsWithChildren<WinProviderProps>) => {
  const { children, game } = props;
  const [win, setWin] = useState(props.win ?? 0);

  const winService = useMemo<WinService>(
    () => ({
      win,
      setWin(value) {
        game.setWin(value);
      },
    }),
    [win, game],
  );

  useEffect(() => {
    game.on('totalWin', setWin);

    return () => {
      game.off('totalWin', setWin);
    };
  }, [game]);

  return <WinServiceContext.Provider value={winService}>{children}</WinServiceContext.Provider>;
};
