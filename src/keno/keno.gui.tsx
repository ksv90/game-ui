import { SpotIdList } from '@ui/helpers';
import { BalanceMediator, ControlsMediator, HeaderMediator, SceneMediator } from '@ui/mediators';
import { useBetService, useConnectorService } from '@ui/providers';
import { JSX, useEffect } from 'react';

import { layout } from './keno.gui.css';

export function KenoGui(): JSX.Element {
  const { getSessionData, ticketCreate } = useConnectorService();
  const { bet } = useBetService();

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
    <div className={layout}>
      <HeaderMediator />
      <BalanceMediator />
      <SceneMediator makeBet={betHandler} />
      <ControlsMediator />
    </div>
  );
}
