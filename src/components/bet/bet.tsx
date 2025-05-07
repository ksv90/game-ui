/* eslint-disable no-magic-numbers */
import { Button, Flex, Text } from '@chakra-ui/react';
import { JSX } from 'react';

import * as styles from './bet.css';

export interface BetProps {
  readonly bet: number;
  readonly presets: readonly number[];
  readonly onChangeBet: (bet: number) => void;
}

export function Bet(props: BetProps): JSX.Element {
  const { bet, presets, onChangeBet } = props;

  const increment = (): void => {
    onChangeBet(bet + 10);
  };
  const decrement = (): void => {
    if (bet > 10) {
      onChangeBet(bet - 10);
    }
  };
  const setBet = (value: number): void => {
    onChangeBet(value);
  };

  return (
    <Flex className={styles.wrapper}>
      <Flex className={styles.presets}>
        {presets.map((value) => (
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
