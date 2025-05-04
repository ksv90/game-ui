import { Flex } from '@chakra-ui/react';
import { Balance, Bet, Countdown, ISpotData, ITicketData, TicketList, Win } from '@ui/components';
import { Writable } from '@ui/helpers';
import { useBallsService, useStateService, useTicketService } from '@ui/providers';
import { PropsWithChildren, useMemo } from 'react';

export interface ContentProps {
  readonly onRemove: (ticketId: string) => void;
}

export function Content({ onRemove }: PropsWithChildren<ContentProps>) {
  const { tickets } = useTicketService();
  const { state } = useStateService();
  const { balls } = useBallsService();

  const ticketDataList = useMemo(() => {
    return tickets.map<ITicketData>(({ ticketId, bet, spots }) => ({
      id: ticketId,
      totalBet: `${String(bet)} EUR`,
      variant: state === 'pending' ? 'default' : 'disabled',
      spots: spots.map<ISpotData>((id) => {
        const spotData: Writable<ISpotData> = { id, variant: 'disabled' };
        if (balls.includes(id)) spotData.variant = 'drawn';
        return spotData;
      }),
    }));
  }, [balls, state, tickets]);

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
      <TicketList tickets={ticketDataList} onClick={onRemove} />
    </>
  );
}
