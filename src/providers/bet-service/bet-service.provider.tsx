import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { BetService, BetServiceContext } from './bet-service.context';

export interface BetServiceGame {
  on(eventName: 'totalBetChanged', listener: (value: number) => void): this;
  off(eventName: 'totalBetChanged', listener: (value: number) => void): this;
  changeBet(value: number): void;
}

export interface BetProviderProps {
  readonly game: BetServiceGame;
  readonly bet?: number;
}

export const BetServiceProvider = (props: PropsWithChildren<BetProviderProps>) => {
  const { children, game } = props;
  const [bet, setBet] = useState(props.bet ?? 0);

  const betService = useMemo<BetService>(
    () => ({
      bet,
      changeBet(value) {
        game.changeBet(value);
      },
    }),
    [bet, game],
  );

  useEffect(() => {
    if (props.bet == null) return;
    setBet(props.bet);
  }, [props.bet]);

  useEffect(() => {
    game.on('totalBetChanged', setBet);

    return () => {
      game.off('totalBetChanged', setBet);
    };
  }, [game]);

  return <BetServiceContext.Provider value={betService}>{children}</BetServiceContext.Provider>;
};
