import { Writable } from '@game-ui/base';
import { ISpotData, SpotBoard } from '@game-ui/components';
import { useBallsService, useStateService } from '@game-ui/providers';
import { JSX, useMemo } from 'react';

import { sceneClass } from './scene.css';

export interface SceneProps {
  readonly onSpotsChange: (spotId: number) => void;
  readonly spotList: number[];
}

export function ScenePanel(props: SceneProps): JSX.Element {
  const { spotList, onSpotsChange } = props;
  const { state } = useStateService();
  const { balls } = useBallsService();

  const spots = useMemo(
    () =>
      Array.from({ length: 80 }, (_, index) => {
        const spotData: Writable<ISpotData> = { id: index + 1, variant: 'default' };
        if (balls.includes(spotData.id)) spotData.variant = 'drawn';
        else if (state === 'process') spotData.variant = 'disabled';
        else if (spotList.includes(spotData.id)) spotData.variant = 'picked';
        return spotData;
      }),
    [spotList, balls, state],
  );

  return (
    <div className={sceneClass}>
      <SpotBoard spots={spots} onClick={onSpotsChange} />
    </div>
  );
}
