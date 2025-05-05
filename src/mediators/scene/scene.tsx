import { Button, Flex } from '@chakra-ui/react';
import { Writable } from '@ui/base';
import { ISpotData, SpotBoard } from '@ui/components';
import { SpotIdList } from '@ui/helpers';
import { useBallsService, useStateService } from '@ui/providers';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

function getRandomValue(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number): number {
  return Math.round(getRandomValue(min, max));
}

export interface SceneProps {
  readonly betAvailable: boolean;
  readonly bet: (spots: SpotIdList) => void;
}

export function Scene(props: PropsWithChildren<SceneProps>) {
  const { betAvailable, bet } = props;
  const [spotList, setSpotList] = useState(new Array<number>());
  const { state } = useStateService();
  const { balls } = useBallsService();

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

  const spotClickHandler = (spot: number) => {
    if (spotList.includes(spot)) {
      setSpotList((prevList) => prevList.filter((prevId) => prevId !== spot));
    } else {
      if (spotList.length >= 10) return;
      setSpotList((prevList) => [...prevList, spot]);
    }
  };

  const clearClickHandler = () => {
    setSpotList([]);
  };

  const randomClickHandler = () => {
    const spotSet = new Set<number>();
    const size = getRandomInt(4, 10);
    while (spotSet.size < size) {
      spotSet.add(getRandomInt(1, 80));
    }
    setSpotList(Array.from(spotSet));
  };

  const betHandler = () => {
    bet(spotList);
    setSpotList([]);
  };

  return (
    <Flex direction="column" margin={10} display="inline-flex">
      <SpotBoard spots={spots} onClick={spotClickHandler} />
      <Flex justifyContent="space-between">
        <Flex>
          <Button disabled={!betAvailable} onClick={clearClickHandler} marginRight={1}>
            Clear
          </Button>
          <Button disabled={!betAvailable} onClick={randomClickHandler}>
            Random
          </Button>
        </Flex>
        <Button disabled={!betAvailable || spotList.length < 4} onClick={betHandler}>
          Bet
        </Button>
      </Flex>
    </Flex>
  );
}
