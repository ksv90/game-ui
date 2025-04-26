import { Flex, Text } from '@chakra-ui/react';
import { useBalanceService } from '@ui/providers';

import styles from './balance.module.css';

export function Balance() {
  const { balance } = useBalanceService();

  return (
    <Flex marginBottom="20px">
      <Text className={styles['balance-text']}>Balance</Text>
      <Text className={styles['balance-text-down']}>{balance}</Text>
    </Flex>
  );
}
