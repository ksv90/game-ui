/* eslint-disable no-magic-numbers */
import { JSX } from 'react';

import * as styles from './bet.css';

export interface BetProps {
  readonly bet: number;
  readonly presets: readonly number[];
  readonly onChangeBet: (bet: number) => void;
  readonly onBet: () => void;
}

export function Bet(props: BetProps): JSX.Element {
  const { bet, presets, onChangeBet, onBet } = props;

  const increment = (): void => {
    onChangeBet(bet + 10);
  };
  const decrement = (): void => {
    if (bet > 10) {
      onChangeBet(bet - 10);
    }
  };
  const setBet = (value: number): void => {
    onChangeBet(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.presets}>
        {presets.map((value) => (
          <div
            key={value}
            onClick={() => {
              setBet(value);
            }}
            className={styles.presetButton}
          >
            {value}
          </div>
        ))}
      </div>
      <div className={styles.betControl}>
        <div className={styles.betValue}>{bet.toLocaleString('ru-RU')}</div>
        <div className={styles.controls}>
          <div onClick={decrement} className={styles.controlButton}>
            −
          </div>
          <div onClick={increment} className={styles.controlButton}>
            +
          </div>
        </div>
        <div onClick={onBet} className={styles.betButton}>
          BET
        </div>
      </div>
    </div>
  );
}
