import { createContext, useContext } from 'react';

export interface StateService {
  get state(): 'pending' | 'process';
}

export const StateServiceContext = createContext<StateService | null>(null);

export const useStateService = (): StateService => {
  const stateService = useContext(StateServiceContext);
  if (!stateService) {
    throw new Error('stateService не определен');
  }
  return stateService;
};
