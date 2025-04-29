import { Button } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export interface BallProps {
  readonly id: number;
  readonly checked: boolean;
  readonly onClick: (id: number) => void;
}

export function Ball(props: PropsWithChildren<BallProps>) {
  const { id, checked, onClick } = props;

  const clickHandler = () => {
    onClick(id);
  };

  return (
    <Button onClick={clickHandler} width={50} height={50} margin={0.5} bgColor={checked ? '#1462A6' : '#2F5171'} color="white">
      {id}
    </Button>
  );
}
