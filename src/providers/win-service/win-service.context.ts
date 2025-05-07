import { createContext, useContext } from 'react';

export interface WinService {
  get win(): number;
  get setWin(): (value: number) => void;
}

export const WinServiceContext = createContext<WinService | null>(null);

export const useWinService = (): WinService => {
  const winService = useContext(WinServiceContext);
  if (!winService) {
    throw new Error('winService не определен');
  }
  return winService;
};
