import { Button, Flex } from '@chakra-ui/react';
import { PropsWithChildren, useState } from 'react';

import { Ball } from '../ball';
import styles from './scene.module.css';

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

  const ballClickHandler = (id: number) => {
    if (checkedIdList.includes(id)) {
      setCheckedIdList((prevList) => prevList.filter((prevId) => prevId !== id));
    } else {
      if (checkedIdList.length >= 10) return;
      setCheckedIdList((prevList) => [...prevList, id]);
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
      <Flex direction="column" marginBottom={10}>
        {Array.from({ length: 8 }).map((_, column) => {
          const ballList = Array.from({ length: 10 }).map((_, row, { length }) => {
            const id = column * length + row + 1;
            return <Ball key={id} id={id} checked={checkedIdList.includes(id)} onClick={ballClickHandler} />;
          });
          return <Flex key={column}>{...ballList}</Flex>;
        })}
      </Flex>
      <Flex justifyContent="space-between" className={styles['buttons-wrapper']}>
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
