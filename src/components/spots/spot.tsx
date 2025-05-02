import { spotSpan, spotVariants } from './spot.css.ts';

export type SpotVariant = keyof typeof spotVariants;

export interface ISpotData {
  readonly number: number;
  readonly variant: SpotVariant;
}

export interface SpotProps extends ISpotData {
  readonly onClick?: (number: number) => void;
}

export function Spot(props: SpotProps) {
  const { number, variant, onClick } = props;

  const clickHandler = () => {
    onClick?.(number);
  };

  return (
    <div className={spotVariants[variant]} onClick={clickHandler}>
      <span className={spotSpan}>{number}</span>
    </div>
  );
}
