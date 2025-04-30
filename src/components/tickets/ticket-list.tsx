import { FC } from 'react';

import { TicketComponent, TicketComponentData } from './ticket';
import { ticketContainerClass } from './tickets.css';

export interface TicketListProps {
  readonly tickets: readonly TicketComponentData[];
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
        <TicketComponent key={ticket.id} {...ticket} onClick={clickHandler} />
      ))}
    </div>
  );
};
