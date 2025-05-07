import { Flex, Text } from '@chakra-ui/react';
import { useWinService } from '@ui/providers';
import { JSX } from 'react';

export function Win(): JSX.Element {
  const { win } = useWinService();

  return (
    <Flex marginBottom="20px">
      <Text flexBasis="100px" display="flex" alignItems="center" marginLeft={50}>
        Last win
      </Text>
      <Text flexBasis="100px" display="flex" alignItems="center" width={200}>
        {win}
      </Text>
    </Flex>
  );
}
