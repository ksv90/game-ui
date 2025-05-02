import { ISpotData, Spot } from '@ui/components';

import { grid } from './spot.css';

export interface SpotsGridProps {
  readonly spots: readonly ISpotData[];
  readonly onClick?: (number: number) => void;
}

export function SpotsGrid(props: SpotsGridProps) {
  const { spots, onClick } = props;

  const clickHandler = (number: number) => {
    onClick?.(number);
  };

  return (
    <div className={grid}>
      {spots.map((spot) => (
        <Spot key={spot.number} number={spot.number} variant={spot.variant} onClick={clickHandler} />
      ))}
    </div>
  );
}
