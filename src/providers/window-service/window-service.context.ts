import { createContext, useContext } from 'react';

export type Orientation = 'portrait' | 'landscape';

export interface WindowService {
  get innerWidth(): number;
  get innerHeight(): number;
  get orientation(): Orientation;
  get portrait(): boolean;
  get landscape(): boolean;
}

export const WindowServiceContext = createContext<WindowService | null>(null);

export const useWindowService = (): WindowService => {
  const windowService = useContext(WindowServiceContext);
  if (!windowService) {
    throw new Error('windowService не определен');
  }
  return windowService;
};
