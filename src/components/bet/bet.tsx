import { Button, Flex, Text } from '@chakra-ui/react';
import { useBetService } from '@ui/providers';

import * as styles from './bet.css';

export function Bet() {
  const { bet, changeBet } = useBetService();

  const increment = () => {
    changeBet(bet + 10);
  };

  const decrement = () => {
    if (bet <= 10) return;
    changeBet(bet - 10);
  };

  return (
    <Flex className={styles.container}>
      <Text className={styles.label}>Total bet</Text>
      <Text className={styles.value}>{bet}</Text>
      <Button type="button" onClick={decrement} className={styles.button}>
        Уменьшить
      </Button>
      <Button type="button" onClick={increment} className={styles.button}>
        Увеличить
      </Button>
    </Flex>
  );
}
