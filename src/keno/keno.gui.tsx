import { Flex } from '@chakra-ui/react';
import { Content, Scene } from '@ui/mediators';
import { useBetService, useConnectorService, useStateService } from '@ui/providers';
import { PropsWithChildren, useEffect } from 'react';

export function KenoGui(_props: PropsWithChildren) {
  const { getSessionData, ticketCreate, ticketCancel } = useConnectorService();
  const { bet } = useBetService();
  const { state } = useStateService();

  useEffect(() => {
    getSessionData();
  }, [getSessionData]);

  const betHandler = (numbers: readonly number[]) => {
    ticketCreate(bet, numbers);
  };

  const removeHandler = (ticketId: string) => {
    if (state !== 'pending') return;
    ticketCancel(ticketId);
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
