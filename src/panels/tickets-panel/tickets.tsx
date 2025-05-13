import { JSX } from 'react';

import { ticketClass } from './ticket.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ITicketPanelProps {
  //
}

export function TicketPanel(_props: ITicketPanelProps): JSX.Element {
  return (
    <>
      <div className={ticketClass}>TicketPanel</div>
    </>
  );
}
