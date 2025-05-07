import { SpotIdList } from '@ui/helpers';
import { BalanceMediator, ControlsMediator, HeaderMediator, SceneMediator } from '@ui/mediators';
import { useBetService, useConnectorService, useWindowService } from '@ui/providers';
import { JSX, PropsWithChildren, useEffect } from 'react';

import { layoutLandscape, layoutPortrait } from './keno.gui.css';

export function KenoGui(_props: PropsWithChildren): JSX.Element {
  const { getSessionData, ticketCreate } = useConnectorService();
  const { bet } = useBetService();
  const { portrait } = useWindowService();

  useEffect(() => {
    getSessionData();
  }, [getSessionData]);

  const betHandler = (spots: SpotIdList): void => {
    ticketCreate(bet, spots);
  };

  // const removeHandler = (ticketId: string): void => {
  //   if (state !== 'pending') return;
  //   ticketCancel(ticketId);
  // };

  return (
    <div className={portrait ? layoutPortrait : layoutLandscape}>
      <HeaderMediator />
      <BalanceMediator />
      <SceneMediator makeBet={betHandler} />
      <ControlsMediator />
    </div>
  );
}
