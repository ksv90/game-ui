/* eslint-disable no-magic-numbers */
import { BalanceMediator, ControlsMediator, HeaderMediator, SceneMediator } from '@game-ui/mediators';
import { useBetService, useConnectorService, useStateService } from '@game-ui/providers';
import { JSX, PropsWithChildren, useEffect, useState } from 'react';

import { layout } from './keno.gui.css';

function getRandomValue(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number): number {
  return Math.round(getRandomValue(min, max));
}

export function KenoGui(_props: PropsWithChildren): JSX.Element {
  const { getSessionData, ticketCreate } = useConnectorService();
  const { bet } = useBetService();
  const [spotList, setSpotList] = useState(new Array<number>());
  const { state } = useStateService();

  useEffect(() => {
    getSessionData();
  }, [getSessionData]);

  const makeBetHandler = (): void => {
    ticketCreate(bet, spotList);
    setSpotList([]);
  };

  // const removeHandler = (ticketId: string): void => {
  //   if (state !== 'pending') return;
  //   ticketCancel(ticketId);
  // };

  useEffect(() => {
    setSpotList([]);
  }, [setSpotList, state]);

  const spotClickHandler = (spot: number): void => {
    if (spotList.includes(spot)) {
      setSpotList((prevList) => prevList.filter((prevId) => prevId !== spot));
    } else {
      if (spotList.length >= 10) return;
      setSpotList((prevList) => [...prevList, spot]);
    }
  };

  const clearClickHandler = (): void => {
    setSpotList([]);
  };

  const randomClickHandler = (): void => {
    const spotSet = new Set<number>();
    const size = getRandomInt(4, 10);
    while (spotSet.size < size) {
      spotSet.add(getRandomInt(1, 80));
    }
    setSpotList(Array.from(spotSet));
  };

  return (
    <div className={layout}>
      <HeaderMediator />
      <BalanceMediator />
      <SceneMediator onSpotsChange={spotClickHandler} spotList={spotList} onClear={clearClickHandler} onRandom={randomClickHandler} />
      <ControlsMediator makeBet={makeBetHandler} />
    </div>
  );
}
