export type SpotIdList = readonly number[];

export type BallList = readonly number[];

export type HitList = readonly number[];

export interface ITicket {
  readonly ticketId: string;
  readonly bet: number;
  readonly spots: SpotIdList;
}

export interface ITicketWin {
  readonly ticketId: string;
  readonly win: number;
  readonly hits: HitList;
}

export interface IUserWin {
  readonly userName: string;
  readonly totalWin: number;
}
