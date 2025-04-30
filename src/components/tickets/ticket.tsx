import { FC } from 'react';

import { Spot } from '../spot';
import { SpotData } from '../spots-grid';
import { betClass, spotRowClass, ticketVariants } from './tickets.css';

export type TicketVariant = keyof typeof ticketVariants;

export interface TicketComponentData {
  readonly id: string;
  readonly variant: TicketVariant;
  readonly totalBet: string;
  readonly spots: readonly SpotData[];
}

export interface TicketProps extends TicketComponentData {
  readonly onClick?: (id: string) => void;
}

export const TicketComponent: FC<TicketProps> = (props) => {
  const { id, variant, totalBet, spots, onClick } = props;

  const clickHandler = () => {
    onClick?.(id);
  };

  return (
    <div className={ticketVariants[variant]} onClick={clickHandler}>
      <div className={betClass}>{totalBet}</div>
      <div className={spotRowClass}>
        {spots.map(({ number, state }) => (
          <Spot key={number} number={number} state={state} />
        ))}
      </div>
    </div>
  );
};
