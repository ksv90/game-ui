import { JSX } from 'react';

import { headerClass, textClass } from './header.css';

export function HeaderMediator(): JSX.Element {
  return (
    <div className={headerClass}>
      <div className={textClass}>Keno</div>
    </div>
  );
}
