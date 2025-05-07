import { Flex } from '@chakra-ui/react';
import { SpotIdList } from '@ui/helpers';
import { Content, Scene } from '@ui/mediators';
import { useBetService, useConnectorService, useStateService } from '@ui/providers';
import { JSX, PropsWithChildren, useEffect } from 'react';

export function KenoGui(_props: PropsWithChildren): JSX.Element {
  const { getSessionData, ticketCreate, ticketCancel } = useConnectorService();
  const { bet } = useBetService();
  const { state } = useStateService();

  useEffect(() => {
    getSessionData();
  }, [getSessionData]);

  const betHandler = (spots: SpotIdList): void => {
    ticketCreate(bet, spots);
  };

  const removeHandler = (ticketId: string): void => {
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
