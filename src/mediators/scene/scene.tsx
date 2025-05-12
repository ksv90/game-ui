// TODO: убрать отключение
/* eslint-disable no-magic-numbers */
import { Button, Flex } from '@chakra-ui/react';
import { Writable } from '@game-ui/base';
import { ISpotData, SpotBoard } from '@game-ui/components';
import { SpotIdList } from '@game-ui/helpers';
import { useBallsService, useStateService } from '@game-ui/providers';
import { JSX, useEffect, useMemo, useState } from 'react';

import { betButton, buttonMarginRight, buttonsGroup, controls, sceneClass } from './scene.css';

function getRandomValue(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number): number {
  return Math.round(getRandomValue(min, max));
}

export interface SceneProps {
  readonly makeBet: (spots: SpotIdList) => void;
}

export function SceneMediator(props: SceneProps): JSX.Element {
  const { makeBet } = props;
  const [spotList, setSpotList] = useState(new Array<number>());
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

  useEffect(() => {
    setSpotList([]);
  }, [state]);

  const spotClickHandler = (spot: number): void => {
    if (spotList.includes(spot)) {
      setSpotList((prevList) => prevList.filter((prevId) => prevId !== spot));
    } else {
      if (spotList.length >= 10) return;
      setSpotList((prevList) => [...prevList, spot]);
    }
  };

  const clearClickHandler = (): void => {
    setSpotList([]);
  };

  const randomClickHandler = (): void => {
    const spotSet = new Set<number>();
    const size = getRandomInt(4, 10);
    while (spotSet.size < size) {
      spotSet.add(getRandomInt(1, 80));
    }
    setSpotList(Array.from(spotSet));
  };

  const betHandler = (): void => {
    makeBet(spotList);
    setSpotList([]);
  };

  return (
    <div className={sceneClass}>
      <SpotBoard spots={spots} onClick={spotClickHandler} />
      <Flex className={controls}>
        <Flex className={buttonsGroup}>
          <Button disabled={!betAvailable} onClick={clearClickHandler} className={buttonMarginRight}>
            Clear
          </Button>
          <Button disabled={!betAvailable} onClick={randomClickHandler}>
            Random
          </Button>
        </Flex>
        <Button disabled={!betAvailable || spotList.length < 4} onClick={betHandler} className={betButton}>
          BET
        </Button>
      </Flex>
    </div>
  );
}
