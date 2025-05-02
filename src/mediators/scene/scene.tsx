import { Button, Flex } from '@chakra-ui/react';
import { ISpotData, SpotsGrid } from '@ui/components';
import { Writable } from '@ui/helpers';
import { useRoundNumbersService, useStateService } from '@ui/providers';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

function getRandomValue(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number): number {
  return Math.round(getRandomValue(min, max));
}

export interface SceneProps {
  readonly betAvailable: boolean;
  readonly bet: (checkedIdList: readonly number[]) => void;
}

export function Scene(props: PropsWithChildren<SceneProps>) {
  const { betAvailable, bet } = props;
  const [checkedIdList, setCheckedIdList] = useState(new Array<number>());
  const { state } = useStateService();
  const { roundNumbers } = useRoundNumbersService();

  const spots = useMemo(
    () =>
      Array.from({ length: 80 }, (_, index) => {
        const spotData: Writable<ISpotData> = { number: index + 1, variant: 'default' };
        if (roundNumbers.includes(spotData.number)) spotData.variant = 'drawn';
        else if (state === 'process') spotData.variant = 'disabled';
        else if (checkedIdList.includes(spotData.number)) spotData.variant = 'picked';
        return spotData;
      }),
    [checkedIdList, roundNumbers, state],
  );

  useEffect(() => {
    setCheckedIdList([]);
  }, [state]);

  const spotClickHandler = (number: number) => {
    if (checkedIdList.includes(number)) {
      setCheckedIdList((prevList) => prevList.filter((prevId) => prevId !== number));
    } else {
      if (checkedIdList.length >= 10) return;
      setCheckedIdList((prevList) => [...prevList, number]);
    }
  };

  const clearClickHandler = () => {
    setCheckedIdList([]);
  };

  const randomClickHandler = () => {
    const numbers = new Set<number>();
    const size = getRandomInt(4, 10);
    while (numbers.size < size) {
      numbers.add(getRandomInt(1, 80));
    }
    setCheckedIdList(Array.from(numbers));
  };

  const spinHandler = () => {
    if (checkedIdList.length < 4) return;
    bet(checkedIdList);
    setCheckedIdList([]);
  };

  return (
    <Flex direction="column" margin={10} display="inline-flex">
      <SpotsGrid spots={spots} onClick={spotClickHandler} />
      <Flex justifyContent="space-between">
        <Flex>
          <Button onClick={clearClickHandler} marginRight={1}>
            Clear
          </Button>
          <Button onClick={randomClickHandler}>Random</Button>
        </Flex>
        <Button disabled={!betAvailable || checkedIdList.length < 4} onClick={spinHandler}>
          Make bet
        </Button>
      </Flex>
    </Flex>
  );
}
