/* eslint-disable no-magic-numbers */
import { Bet } from '@ui/components';
import { useBetService } from '@ui/providers';
import { JSX } from 'react';

import { controlsClass } from './controls.css';

const presetBets = [1, 5, 20, 50, 70, 100];

export interface ControlsMediatorProps {
  readonly makeBet: () => void;
}

export function ControlsMediator(props: ControlsMediatorProps): JSX.Element {
  const { bet, changeBet } = useBetService();
  const { makeBet } = props;

  const changeBetHandler = (betValue: number): void => {
    changeBet(betValue);
  };

  return (
    <div className={controlsClass}>
      <Bet bet={bet} presets={presetBets} onChangeBet={changeBetHandler} onBet={makeBet} />
    </div>
  );
}
