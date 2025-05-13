/* eslint-disable no-magic-numbers */
import { Button, Flex } from '@chakra-ui/react';
import { Bet } from '@game-ui/components';
import { useBetService, useStateService } from '@game-ui/providers';
import { JSX } from 'react';

import { buttonMarginRight, buttonsGroup, controlsClass } from './controls.css';

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
      <Flex className={buttonsGroup}>
        <Button disabled={!betAvailable} onClick={onClear} className={buttonMarginRight}>
          Clear
        </Button>
        <Button disabled={!betAvailable} onClick={onRandom}>
          Random
        </Button>
      </Flex>
    </div>
  );
}
