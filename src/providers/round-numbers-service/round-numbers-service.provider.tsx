import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { RoundNumbersService, RoundNumbersServiceContext } from './round-numbers-service.context';

export interface RoundNumbersServiceGame {
  on(eventName: 'roundNumberAdded', listener: (value: number) => void): this;
  on(eventName: 'roundNumberCleared', listener: () => void): this;

  off(eventName: 'roundNumberAdded', listener: (value: number) => void): this;
  off(eventName: 'roundNumberCleared', listener: () => void): this;

  addRoundNumbers(...values: number[]): void;
}

export interface RoundNumbersProviderProps {
  readonly game: RoundNumbersServiceGame;
  readonly roundNumbers?: readonly number[];
}

export const RoundNumbersServiceProvider = (props: PropsWithChildren<RoundNumbersProviderProps>) => {
  const { children, game } = props;
  const [roundNumbers, setRoundNumbers] = useState(props.roundNumbers ?? []);

  const roundNumbersService = useMemo<RoundNumbersService>(
    () => ({
      roundNumbers,
      addRoundNumbers(...values) {
        game.addRoundNumbers(...values);
      },
    }),
    [game, roundNumbers],
  );

  useEffect(() => {
    const roundNumberAddHandler = (value: number) => {
      setRoundNumbers((prev) => [...prev, value]);
    };

    const roundNumberClearHandler = () => {
      setRoundNumbers([]);
    };

    game.on('roundNumberAdded', roundNumberAddHandler);
    game.on('roundNumberCleared', roundNumberClearHandler);

    return () => {
      game.off('roundNumberAdded', roundNumberAddHandler);
      game.off('roundNumberCleared', roundNumberClearHandler);
    };
  }, [game]);

  return <RoundNumbersServiceContext.Provider value={roundNumbersService}>{children}</RoundNumbersServiceContext.Provider>;
};
