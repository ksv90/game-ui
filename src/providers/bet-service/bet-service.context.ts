import { createContext, useContext } from 'react';

export interface BetService {
  get bet(): number;
  get changeBet(): (value: number) => void;
}

export const BetServiceContext = createContext<BetService | null>(null);

export const useBetService = () => {
  const betService = useContext(BetServiceContext);
  if (!betService) {
    throw new Error('betService не определен');
  }
  return betService;
};
