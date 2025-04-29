import { FC } from 'react';

import { Ticket, TicketData } from './ticket';
import { ticketContainerClass } from './tickets.css';

export interface TicketListProps {
  readonly tickets: readonly TicketData[];
  readonly onClick?: (id: string) => void;
}

export const TicketList: FC<TicketListProps> = (props) => {
  const { tickets, onClick } = props;

  const clickHandler = (id: string) => {
    onClick?.(id);
  };

  return (
    <div className={ticketContainerClass}>
      {tickets.map((ticket) => (
        <Ticket key={ticket.id} {...ticket} onClick={clickHandler} />
      ))}
    </div>
  );
};
