import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { CountdownService, CountdownServiceContext } from './countdown-service.context';

export interface CountdownServiceGame {
  on(eventName: 'countdown', listener: (value: number) => void): this;
  off(eventName: 'countdown', listener: (value: number) => void): this;
  setCountdown(value: number): void;
}

export interface CountdownProviderProps {
  readonly game: CountdownServiceGame;
  readonly countdown?: number;
}

export const CountdownServiceProvider = (props: PropsWithChildren<CountdownProviderProps>) => {
  const { children, game } = props;
  const [countdown, setCountdownValue] = useState(props.countdown ?? 0);

  const countdownService = useMemo<CountdownService>(
    () => ({
      countdown,
      setCountdown(value) {
        game.setCountdown(value);
      },
    }),
    [countdown, game],
  );

  useEffect(() => {
    game.on('countdown', setCountdownValue);

    return () => {
      game.off('countdown', setCountdownValue);
    };
  }, [game]);

  return <CountdownServiceContext.Provider value={countdownService}>{children}</CountdownServiceContext.Provider>;
};
