import { JSX } from 'react';

import { spotSpan, spotVariants } from './spot.css.ts';

export type SpotVariant = keyof typeof spotVariants;

export interface ISpotData {
  readonly id: number;
  readonly variant: SpotVariant;
}

export interface SpotProps extends ISpotData {
  readonly onClick?: (id: number) => void;
}

export function Spot(props: SpotProps): JSX.Element {
  const { id, variant, onClick } = props;

  const clickHandler = (): void => {
    onClick?.(id);
  };

  return (
    <div className={spotVariants[variant]} onClick={clickHandler}>
      <span className={spotSpan}>{id}</span>
    </div>
  );
}
