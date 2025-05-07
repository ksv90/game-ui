/* eslint-disable no-magic-numbers */
import { Button, Flex, Text } from '@chakra-ui/react';
import { useBetService } from '@ui/providers';
import { JSX } from 'react';

import * as styles from './bet.css';

const presetBets = [1, 5, 20, 100];

export function Bet(): JSX.Element {
  const { bet, changeBet } = useBetService();

  const increment = (): void => {
    changeBet(bet + 10);
  };
  const decrement = (): void => {
    if (bet > 10) {
      changeBet(bet - 10);
    }
  };
  const setBet = (value: number): void => {
    changeBet(value);
  };

  return (
    <Flex className={styles.wrapper}>
      <Flex className={styles.presets}>
        {presetBets.map((value) => (
          <Button
            key={value}
            onClick={() => {
              setBet(value);
            }}
            className={styles.presetButton}
          >
            {value}
          </Button>
        ))}
      </Flex>
      <Flex className={styles.betControl}>
        <Text className={styles.betValue}>{bet.toLocaleString('ru-RU')}</Text>
        <Flex className={styles.controls}>
          <Button onClick={decrement} className={styles.controlButton}>
            −
          </Button>
          <Button onClick={increment} className={styles.controlButton}>
            +
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
