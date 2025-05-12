/* eslint-disable no-magic-numbers */
import { JSX, useEffect } from 'react';

import { KenoApp } from './keno.app';
import { KenoGui } from './keno.gui';
import { KenoRules } from './keno.rules';
import { createKenoMachineMock, getKenoMachineMockConfig, KenoConnectorMock, KenoGameMock, KenoMessengerMock, KenoServerMock } from './mock';

const payouts = {
  '1': [0, 1.5],
  '2': [0, 0, 5],
  '3': [0, 0, 1, 11],
  '4': [0, 0, 0, 2, 20],
  '5': [0, 0, 0, 1, 4, 50],
  '6': [0, 0, 0, 0, 2, 20, 200],
  '7': [0, 0, 0, 0, 1, 4, 40, 600],
  '8': [0, 0, 0, 0, 1, 2, 10, 100, 2000],
  '9': [0, 0, 0, 0, 0, 1, 5, 50, 400, 7000],
  '10': [0, 0, 0, 0, 0, 1, 2, 10, 140, 1400, 20000],
};

export function KenoPreview(): JSX.Element {
  const server = new KenoServerMock(payouts);
  const keno = new KenoGameMock();
  const messenger = new KenoMessengerMock();
  const connector = new KenoConnectorMock(messenger, server);
  const roundMachine = createKenoMachineMock(getKenoMachineMockConfig(messenger, server));

  const gui = <KenoGui />;
  const rules = <KenoRules />;

  useEffect(() => {
    roundMachine.start();

    return () => {
      roundMachine.stop();
    };
  });

  return <KenoApp game={keno} connector={connector} receiver={messenger} ui={gui} rules={rules} />;
}
