import { spotSpan, spotVariants } from './spot.css.ts';

export type SpotState = 'default' | 'picked' | 'disabled' | 'drawn';

export interface SpotProps {
  readonly number: number;
  readonly state: SpotState;
  readonly onClick?: (number: number) => void;
}

export function Spot(props: SpotProps) {
  const { number, state, onClick } = props;

  const clickHandler = () => {
    onClick?.(number);
  };

  return (
    <div className={spotVariants[state]} onClick={clickHandler}>
      <span className={spotSpan}>{number}</span>
    </div>
  );
}
