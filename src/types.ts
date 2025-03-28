export interface Ticket {
  readonly ticketId: string;
  readonly bet: number;
  readonly numbers: readonly number[];
  readonly win: number;
}
