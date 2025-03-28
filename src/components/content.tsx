import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { useStateService, useTicketService } from '../services';
import { Balance } from './balance';
import { Bet } from './bet';
import { Tickets } from './tickets';

export interface ContentProps {
  readonly onRemove: (ticketId: string) => void;
}

export function Content({ onRemove }: PropsWithChildren<ContentProps>) {
  const { tickets } = useTicketService();
  const { state } = useStateService();

  return (
    <>
      <Flex justifyContent="center">
        <Bet />
        <Balance />
      </Flex>
      <Tickets removeAvailable={state !== 'pending'} tickets={tickets} onRemove={onRemove} />
    </>
  );
}
