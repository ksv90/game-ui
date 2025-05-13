import './global.css';

import { createRoot } from 'react-dom/client';

import { KenoPreview } from './keno';

const $root = document.getElementById('root');

if (!$root) {
  throw new Error(`Корневой элемент не найден`);
}

createRoot($root).render(<KenoPreview />);
