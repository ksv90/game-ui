import { FC } from 'react';

import { ISpotData, Spot } from '../spots';
import { betClass, spotRowClass, ticketVariants } from './tickets.css';

export type TicketVariant = keyof typeof ticketVariants;

export interface ITicketData {
  readonly id: string;
  readonly variant: TicketVariant;
  readonly totalBet: string;
  readonly spots: readonly ISpotData[];
}

export interface TicketProps extends ITicketData {
  readonly onClick?: (id: string) => void;
}

export const Ticket: FC<TicketProps> = (props) => {
  const { id, variant, totalBet, spots, onClick } = props;

  const clickHandler = () => {
    onClick?.(id);
  };

  return (
    <div className={ticketVariants[variant]} onClick={clickHandler}>
      <div className={betClass}>{totalBet}</div>
      <div className={spotRowClass}>
        {spots.map(({ id, variant }) => (
          <Spot key={id} id={id} variant={variant} />
        ))}
      </div>
    </div>
  );
};
