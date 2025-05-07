import { JSX, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { BalanceService, BalanceServiceContext } from './balance-service.context';

export interface BalanceServiceGame {
  on(eventName: 'balanceUpdated', listener: (value: number) => void): this;
  off(eventName: 'balanceUpdated', listener: (value: number) => void): this;
  updateBalance(value: number): void;
}

export interface BalanceProviderProps {
  readonly game: BalanceServiceGame;
  readonly balance?: number;
}

export const BalanceServiceProvider = (props: PropsWithChildren<BalanceProviderProps>): JSX.Element => {
  const { children, game } = props;
  const [balance, setBalance] = useState(props.balance ?? 0);

  const balanceService = useMemo<BalanceService>(
    () => ({
      balance,
      updateBalance(value) {
        game.updateBalance(value);
      },
    }),
    [balance, game],
  );

  useEffect(() => {
    if (props.balance == null) return;
    setBalance(props.balance);
  }, [props.balance]);

  useEffect(() => {
    game.on('balanceUpdated', setBalance);

    return () => {
      game.off('balanceUpdated', setBalance);
    };
  }, [game]);

  return <BalanceServiceContext.Provider value={balanceService}>{children}</BalanceServiceContext.Provider>;
};
