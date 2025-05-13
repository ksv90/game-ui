// TODO: убрать отключение

import { Button, Flex } from '@chakra-ui/react';
import { Writable } from '@ui/base';
import { ISpotData, SpotBoard } from '@ui/components';
import { useBallsService, useStateService } from '@ui/providers';
import { JSX, useMemo } from 'react';

import { buttonMarginRight, buttonsGroup, controls, sceneClass } from './scene.css';

export interface SceneProps {
  readonly onSpotsChange: (spotId: number) => void;
  readonly spotList: number[];
  readonly onClear: () => void;
  readonly onRandom: () => void;
}

export function SceneMediator(props: SceneProps): JSX.Element {
  const { spotList, onSpotsChange, onClear, onRandom } = props;
  const { state } = useStateService();
  const { balls } = useBallsService();

  const betAvailable = state === 'pending';

  const spots = useMemo(
    () =>
      Array.from({ length: 80 }, (_, index) => {
        const spotData: Writable<ISpotData> = { id: index + 1, variant: 'default' };
        if (balls.includes(spotData.id)) spotData.variant = 'drawn';
        else if (state === 'process') spotData.variant = 'disabled';
        else if (spotList.includes(spotData.id)) spotData.variant = 'picked';
        return spotData;
      }),
    [spotList, balls, state],
  );

  return (
    <div className={sceneClass}>
      <SpotBoard spots={spots} onClick={onSpotsChange} />
      <Flex className={controls}>
        <Flex className={buttonsGroup}>
          <Button disabled={!betAvailable} onClick={onClear} className={buttonMarginRight}>
            Clear
          </Button>
          <Button disabled={!betAvailable} onClick={onRandom}>
            Random
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
