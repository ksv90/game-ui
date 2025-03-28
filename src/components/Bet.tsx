import { Button, Flex, Text } from '@chakra-ui/react';

import { useBetService } from '../services';

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
    <Flex marginBottom="20px">
      <Text display="flex" width={200} alignItems="center">
        Total bet
      </Text>
      <Text display="flex" flexBasis="50px" alignItems="center">
        {bet}
      </Text>
      <Button type="button" margin="0 10px" onClick={decrement}>
        Уменьшить
      </Button>
      <Button type="button" margin="0 10px" onClick={increment}>
        Увеличить
      </Button>
    </Flex>
  );
}
