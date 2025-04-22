import { createContext, useContext } from 'react';

export interface CountdownService {
  get countdown(): number;
  get setCountdown(): (value: number) => void;
}

export const CountdownServiceContext = createContext<CountdownService | null>(null);

export const useCountdownService = () => {
  const countdownService = useContext(CountdownServiceContext);
  if (!countdownService) {
    throw new Error('countdownService не определен');
  }
  return countdownService;
};
