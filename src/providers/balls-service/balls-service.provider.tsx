import { BallList } from '@game-ui/helpers';
import { JSX, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { BallsService, BallsServiceContext } from './balls-service.context';

export interface BallsServiceGame {
  on(eventName: 'ballAdded', listener: (value: number) => void): this;
  on(eventName: 'ballsCleared', listener: () => void): this;

  off(eventName: 'ballAdded', listener: (value: number) => void): this;
  off(eventName: 'ballsCleared', listener: () => void): this;

  addBalls(...values: number[]): void;
}

export interface BallsServiceProviderProps {
  readonly game: BallsServiceGame;
  readonly balls?: BallList;
}

export const BallsServiceProvider = (props: PropsWithChildren<BallsServiceProviderProps>): JSX.Element => {
  const { children, game } = props;
  const [balls, setBalls] = useState(props.balls ?? []);

  const ballsService = useMemo<BallsService>(
    () => ({
      balls,
      addBalls(...values) {
        game.addBalls(...values);
      },
    }),
    [game, balls],
  );

  useEffect(() => {
    const ballAddHandler = (value: number): void => {
      setBalls((prev) => [...prev, value]);
    };

    const ballsClearHandler = (): void => {
      setBalls([]);
    };

    game.on('ballAdded', ballAddHandler);
    game.on('ballsCleared', ballsClearHandler);

    return () => {
      game.off('ballAdded', ballAddHandler);
      game.off('ballsCleared', ballsClearHandler);
    };
  }, [game]);

  return <BallsServiceContext.Provider value={ballsService}>{children}</BallsServiceContext.Provider>;
};
