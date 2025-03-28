import { Centrifuge } from 'centrifuge';
import { createRoot } from 'react-dom/client';

import { Connector, Keno } from './game/';
import { App } from './App';
import { Game } from './components';

const ROOT_ID = 'root';

const { VITE_CENTRIFUGO_URL = 'ws://192.168.1.10:8000' } = import.meta.env;

const $root = document.getElementById(ROOT_ID);

if (!$root) {
  throw new Error(`Не найдено элемента с id ${ROOT_ID}`);
}

const keno = new Keno();
const connector = new Connector();
const centrifuge = new Centrifuge(`${VITE_CENTRIFUGO_URL}/connection/websocket`, {
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNmY2MTgyZC04NGI2LTQxZjctYTdmZS0zNzJmNGY5ODJhMjEiLCJleHAiOjE3NDMxNjc1NjN9.HvTIy3TY5FGo_CZQEqcXCltrZWMwKZen6_mfs7lJR7k',
});

createRoot($root).render(
  <App game={keno} connector={connector} centrifuge={centrifuge}>
    <Game />
  </App>,
);
