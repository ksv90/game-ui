import { JSX } from 'react';

import { amount, label } from './balance.css';

export function Balance(props: { balance: number }): JSX.Element {
  const { balance } = props;
  const formattedBalance = balance.toLocaleString('fr-FR');

  return (
    <div>
      <div className={label}>BALANCE</div>
      <div className={amount}>{formattedBalance} EUR</div>
    </div>
  );
}
