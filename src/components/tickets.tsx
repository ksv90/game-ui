import { CloseButton, Flex, Text } from '@chakra-ui/react';
import { MouseEventHandler, PropsWithChildren } from 'react';

import { Ticket } from '../types';

export interface TicketsProps {
  readonly removeAvailable: boolean;
  readonly tickets: readonly Ticket[];
  readonly onRemove: (ticketId: string) => void;
}

export function Tickets(props: PropsWithChildren<TicketsProps>) {
  const { removeAvailable, tickets, onRemove } = props;

  const removeHandler: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
    const { ticketId } = currentTarget.dataset;
    if (!ticketId) {
      throw new Error('Ticket id is not provided');
    }
    onRemove(ticketId);
  };

  return (
    <Flex direction="column">
      {tickets.map(({ ticketId, bet, numbers }) => (
        <Flex key={ticketId} margin={1}>
          <Text marginRight={2}>{`${String(bet)}:`}</Text>
          <Text>{`{${numbers.join(', ')}}`}</Text>
          <CloseButton size="xs" variant="solid" marginLeft={2} data-ticket-id={ticketId} onClick={removeHandler} disabled={removeAvailable} />
        </Flex>
      ))}
    </Flex>
  );
}
