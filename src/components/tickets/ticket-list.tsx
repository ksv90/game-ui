import { FC } from 'react';

import { ITicketData, Ticket } from './ticket';
import { ticketContainerClass } from './tickets.css';

export interface TicketListProps {
  readonly tickets: readonly ITicketData[];
  readonly onClick?: (id: string) => void;
}

export const TicketList: FC<TicketListProps> = (props) => {
  const { tickets, onClick } = props;

  const clickHandler = (id: string): void => {
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
