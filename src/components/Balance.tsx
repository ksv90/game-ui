import { Flex, Text } from '@chakra-ui/react';

import { useBalanceService } from '../services';

export function Balance() {
  const { balance } = useBalanceService();

  return (
    <Flex marginBottom="20px">
      <Text flexBasis="100px" display="flex" alignItems="center" marginLeft={50}>
        Balance
      </Text>
      <Text flexBasis="100px" display="flex" alignItems="center" width={200}>
        {balance}
      </Text>
    </Flex>
  );
}
