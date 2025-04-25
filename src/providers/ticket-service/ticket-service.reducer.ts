import { Ticket } from '@ui/helpers';

export interface AddTicketAction {
  readonly type: 'add';
  readonly payload: { readonly ticket: Ticket };
}

export interface RemoveTicketAction {
  readonly type: 'remove';
  readonly payload: { readonly ticketId: string };
}

export interface UpdateTicketsAction {
  readonly type: 'update';
  readonly payload: { readonly tickets: readonly Ticket[] };
}

export type TicketReducerState = readonly Ticket[];

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
      const { tickets } = action.payload;
      return tickets;
    }
  }
}
