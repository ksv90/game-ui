import { Balance } from '@game-ui/components';
import { useBalanceService } from '@game-ui/providers';
import { JSX } from 'react';

import { balanceClass } from './balance.css';

export function BalanceMediator(): JSX.Element {
  const { balance } = useBalanceService();

  return (
    <div className={balanceClass}>
      <Balance balance={balance} />
    </div>
  );
}
