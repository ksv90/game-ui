import { Spot, SpotState } from '@ui/components';

import { grid } from './spots-grid.css.ts';

export interface SpotData {
  readonly number: number;
  readonly state: SpotState;
}

export interface SpotsGridProps {
  readonly spots: readonly SpotData[];
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
        <Spot key={spot.number} number={spot.number} state={spot.state} onClick={clickHandler} />
      ))}
    </div>
  );
}
