import { ITicket } from '@game-ui/helpers';

export interface AddTicketAction {
  readonly type: 'add';
  readonly payload: { readonly ticket: ITicket };
}

export interface RemoveTicketAction {
  readonly type: 'remove';
  readonly payload: { readonly ticketId: string };
}

export interface UpdateTicketsAction {
  readonly type: 'update';
  readonly payload: { readonly tickets: readonly ITicket[] };
}

export type TicketReducerState = readonly ITicket[];

export type TicketReducerAction = AddTicketAction | RemoveTicketAction | UpdateTicketsAction;

export function ticketServiceReducer(tickets: TicketReducerState, action: TicketReducerAction): TicketReducerState {
  switch (action.type) {
    case 'add': {
      const { ticket } = action.payload;
      return tickets.filter(({ ticketId }) => ticketId !== ticket.ticketId).concat(ticket);
    }
    case 'remove': {
      const { ticketId } = action.payload;
      return tickets.filter((ticket) => ticket.ticketId !== ticketId);
    }
    case 'update': {
      const { tickets: ticketList } = action.payload;
      return ticketList;
    }
  }
}
