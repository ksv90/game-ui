import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { useBetService, useConnectorService, useStateService, useTicketService } from '../services';
import { Content } from './content';
import { Scene } from './scene';

export function Game(_props: PropsWithChildren) {
  const { ticketCreate, ticketCancel } = useConnectorService();
  const { bet } = useBetService();
  const { removeTickets } = useTicketService();
  const { state } = useStateService();

  const betHandler = (numbers: readonly number[]) => {
    ticketCreate(bet, numbers);
  };

  const removeHandler = (ticketId: string) => {
    ticketCancel(ticketId);
    removeTickets(ticketId);
  };

  return (
    <>
      <Flex justifyContent="center">
        <Scene betAvailable={state === 'pending'} bet={betHandler} />
      </Flex>
      <Content onRemove={removeHandler} />
    </>
  );
}
