import { StateMachine } from '@ksv90/fsm';
import { createRoot } from 'react-dom/client';

import { KenoApp, KenoGui, KenoRules } from './keno';
import { Connector, Context, createRoundMachineConfig, Keno, Messenger } from './local';

const $root = document.getElementById('root');

if (!$root) {
  throw new Error(`Не найдено корневого элемента`);
}

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

const context = new Context(payouts);
const keno = new Keno();
const messenger = new Messenger();
const connector = new Connector(messenger, context);
const roundMachine = new StateMachine(createRoundMachineConfig(messenger, context));

roundMachine.start();

const gui = <KenoGui />;
const rules = <KenoRules />;

createRoot($root).render(<KenoApp game={keno} connector={connector} receiver={messenger} ui={gui} rules={rules} />);
