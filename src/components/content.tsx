import { Flex } from '@chakra-ui/react';
import { useRoundNumbersService, useStateService, useTicketService } from '@ui/providers';
import { PropsWithChildren, useMemo } from 'react';

import { Balance } from './balance';
import { Bet } from './bet';
import { Countdown } from './countdown';
import { TicketComponentData, TicketList } from './tickets';
import { Win } from './win';

export interface ContentProps {
  readonly onRemove: (ticketId: string) => void;
}

export function Content({ onRemove }: PropsWithChildren<ContentProps>) {
  const { tickets } = useTicketService();
  const { state } = useStateService();
  const { roundNumbers } = useRoundNumbersService();

  const ticketDataList = useMemo(() => {
    return tickets.map<TicketComponentData>(({ ticketId, bet, numbers }) => ({
      id: ticketId,
      totalBet: `${String(bet)} EUR`,
      variant: state === 'pending' ? 'default' : 'disabled',
      spots: numbers.map((number) => ({ number, state: roundNumbers.includes(number) ? 'drawn' : 'default' })),
    }));
  }, [roundNumbers, state, tickets]);

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
