import { JSX } from 'react';

import { infoClass } from './info.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IInfoPanelProps {
  //
}

export function InfoPanel(_props: IInfoPanelProps): JSX.Element {
  return (
    <>
      <div className={infoClass}>InfoPanel</div>
    </>
  );
}
