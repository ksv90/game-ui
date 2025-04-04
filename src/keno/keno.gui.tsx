import { Flex } from '@chakra-ui/react';
import { Content, Scene } from '@ui/components';
import { useBetService, useConnectorService, useStateService, useTicketService } from '@ui/providers';
import { PropsWithChildren, useEffect } from 'react';

export function KenoGui(_props: PropsWithChildren) {
  const { getSessionData, ticketCreate, ticketCancel } = useConnectorService();
  const { bet } = useBetService();
  const { removeTickets } = useTicketService();
  const { state } = useStateService();

  useEffect(() => {
    getSessionData();
  }, [getSessionData]);

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
