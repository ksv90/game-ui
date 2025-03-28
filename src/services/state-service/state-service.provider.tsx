import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { StateService, StateServiceContext } from './state-service.context';

export interface StateServiceGame {
  on(eventName: 'roundStarted' | 'roundCompleted', listener: () => void): this;
  off(eventName: 'roundStarted' | 'roundCompleted', listener: () => void): this;
}

export interface StateServiceProviderProps {
  readonly game: StateServiceGame;
  readonly state: StateService['state'];
}

export const StateServiceProvider = (props: PropsWithChildren<StateServiceProviderProps>) => {
  const { children, game } = props;
  const [state, setState] = useState(props.state);

  const stateService = useMemo<StateService>(
    () => ({
      state,
    }),
    [state],
  );

  useEffect(() => {
    const roundStartHandler = () => {
      setState('process');
    };

    const roundCompleteHandler = () => {
      setState('pending');
    };

    game.on('roundStarted', roundStartHandler);
    game.on('roundCompleted', roundCompleteHandler);

    return () => {
      game.off('roundStarted', roundStartHandler);
      game.on('roundCompleted', roundCompleteHandler);
    };
  });

  return <StateServiceContext.Provider value={stateService}>{children}</StateServiceContext.Provider>;
};
