import { Flex } from '@chakra-ui/react';
import { Balance, Bet, Countdown, ISpotData, ITicketData, TicketList } from '@ui/components';
import { Writable } from '@ui/helpers';
import { useRoundNumbersService, useStateService, useTicketService } from '@ui/providers';
import { PropsWithChildren, useMemo } from 'react';

import { Win } from '../components/win';

export interface ContentProps {
  readonly onRemove: (ticketId: string) => void;
}

export function Content({ onRemove }: PropsWithChildren<ContentProps>) {
  const { tickets } = useTicketService();
  const { state } = useStateService();
  const { roundNumbers } = useRoundNumbersService();

  const ticketDataList = useMemo(() => {
    return tickets.map<ITicketData>(({ ticketId, bet, numbers }) => ({
      id: ticketId,
      totalBet: `${String(bet)} EUR`,
      variant: state === 'pending' ? 'default' : 'disabled',
      spots: numbers.map<ISpotData>((number) => {
        const spotData: Writable<ISpotData> = { number, variant: 'default' };
        if (roundNumbers.includes(number)) spotData.variant = 'drawn';
        else if (state === 'process') spotData.variant = 'disabled';
        return spotData;
      }),
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
