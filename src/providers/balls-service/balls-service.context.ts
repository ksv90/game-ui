import { BallList } from '@game-ui/helpers';
import { createContext, useContext } from 'react';

export interface BallsService {
  get balls(): BallList;
  get addBalls(): (...balls: number[]) => void;
}

export const BallsServiceContext = createContext<BallsService | null>(null);

export const useBallsService = (): BallsService => {
  const ballsService = useContext(BallsServiceContext);
  if (!ballsService) {
    throw new Error('ballsService не определен');
  }
  return ballsService;
};
