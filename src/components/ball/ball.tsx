import { Button } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import styles from './ball.module.css';

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
    <Button
      onClick={clickHandler}
      width="50px"
      height="50px"
      margin="0.5"
      padding="0"
      bg="#2F5171"
      color="white"
      className={styles['numbers-windows']}
    >
      <div className={`${styles.inner} ${checked ? styles.checked : ''}`}>{id}</div>
    </Button>
  );
}
