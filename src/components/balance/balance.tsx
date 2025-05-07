import { Box, Text } from '@chakra-ui/react';

import { amount, container, label } from './balance.css';

export function Balance(props: { balance: number }) {
  const { balance } = props;
  const formattedBalance = balance.toLocaleString('fr-FR');

  return (
    <Box className={container}>
      <Text className={label}>BALANCE</Text>
      <Text className={amount}>{formattedBalance} EUR</Text>
    </Box>
  );
}
