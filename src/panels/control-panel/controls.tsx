/* eslint-disable no-magic-numbers */
import { Bet } from '@game-ui/components';
import { useBetService, useStateService } from '@game-ui/providers';
import { JSX } from 'react';

import { buttonsGroup, buttonTemp, controlsClass } from './controls.css';

const presetBets = [1, 5, 20, 50, 70, 100];

export interface ControlsMediatorProps {
  readonly makeBet: () => void;
  readonly onClear: () => void;
  readonly onRandom: () => void;
}

export function ControlsPanel(props: ControlsMediatorProps): JSX.Element {
  const { makeBet, onRandom, onClear } = props;

  const { state } = useStateService();
  const { bet, changeBet } = useBetService();

  const betAvailable = state === 'pending';

  const changeBetHandler = (betValue: number): void => {
    changeBet(betValue);
  };

  return (
    <div className={controlsClass}>
      <Bet bet={bet} presets={presetBets} onChangeBet={changeBetHandler} onBet={makeBet} />
      <div className={buttonsGroup}>
        <button disabled={!betAvailable} onClick={onClear} className={buttonTemp}>
          Clear
        </button>
        <button disabled={!betAvailable} onClick={onRandom} className={buttonTemp}>
          Random
        </button>
      </div>
    </div>
  );
}
