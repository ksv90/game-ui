import { createContext, useContext } from 'react';

export interface BalanceService {
  get balance(): number;
  get updateBalance(): (value: number) => void;
}

export const BalanceServiceContext = createContext<BalanceService | null>(null);

export const useBalanceService = () => {
  const balanceService = useContext(BalanceServiceContext);
  if (!balanceService) {
    throw new Error('balanceService не определен');
  }
  return balanceService;
};
