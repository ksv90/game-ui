import { Flex } from '@chakra-ui/react';
import { useStateService, useTicketService } from '@ui/providers';
import { PropsWithChildren } from 'react';

import { Balance } from './balance';
import { Bet } from './bet';
import { Countdown } from './countdown';
import { Tickets } from './tickets';
import { Win } from './win';

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
      </Flex>
      <Flex justifyContent="center">
        <Win />
        <Balance />
      </Flex>
      <Flex justifyContent="center">{state === 'pending' ? <Countdown /> : <p>process</p>}</Flex>
      <Tickets removeAvailable={state !== 'pending'} tickets={tickets} onRemove={onRemove} />
    </>
  );
}
