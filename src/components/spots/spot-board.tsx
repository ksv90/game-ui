import { ISpotData, Spot } from '@game-ui/components';
import { JSX } from 'react';

import { grid } from './spot.css';

export interface SpotBoardProps {
  readonly spots: readonly ISpotData[];
  readonly onClick?: (id: number) => void;
}

export function SpotBoard(props: SpotBoardProps): JSX.Element {
  const { spots, onClick } = props;

  return (
    <div className={grid}>
      {spots.map((spot) => (
        <Spot key={spot.id} id={spot.id} variant={spot.variant} onClick={onClick} />
      ))}
    </div>
  );
}
