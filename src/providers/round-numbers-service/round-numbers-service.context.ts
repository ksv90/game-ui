import { createContext, useContext } from 'react';

export interface RoundNumbersService {
  get roundNumbers(): readonly number[];
  get addRoundNumbers(): (...values: number[]) => void;
}

export const RoundNumbersServiceContext = createContext<RoundNumbersService | null>(null);

export const useRoundNumbersService = () => {
  const roundNumbersService = useContext(RoundNumbersServiceContext);
  if (!roundNumbersService) {
    throw new Error('roundNumbersService не определен');
  }
  return roundNumbersService;
};
