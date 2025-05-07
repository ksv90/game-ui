/* eslint-disable no-magic-numbers */
import { Bet } from '@ui/components';
import { useBetService } from '@ui/providers';
import { JSX } from 'react';

import { controlsClass } from './controls.css';

const presetBets = [1, 5, 20, 100];

export function ControlsMediator(): JSX.Element {
  const { bet, changeBet } = useBetService();

  const changeBetHandler = (betValue: number): void => {
    changeBet(betValue);
  };

  return (
    <div className={controlsClass}>
      <Bet bet={bet} presets={presetBets} onChangeBet={changeBetHandler} />
    </div>
  );
}
