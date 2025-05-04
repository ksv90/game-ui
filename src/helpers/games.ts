import { IBallList, IEmitterLite, ITicket, ITicketWin, IUserWin } from './types';

export interface IKenoGameEvents {
  balanceUpdated: [value: number];
  totalBetChanged: [value: number];
  ticketAdded: [ticket: ITicket];
  ticketRemoved: [ticketId: string];
  ticketsCleared: [];
  roundStarted: [{ users: number }];
  roundCompleted: [{ balls: IBallList; userWins: readonly IUserWin[] }];
  countdown: [value: number];
  ballAdded: [value: number];
  ballsCleared: [];
  totalWin: [value: number];
}

export interface IKenoGame extends IEmitterLite<IKenoGameEvents> {
  start(): void;
  stop(): void;

  updateBalance(value: number): void;
  changeBet(value: number): void;

  addTickets(...tickets: ITicket[]): void;
  removeTickets(...ticketIds: string[]): void;
  ticketWins(...ticketWins: ITicketWin[]): void;
  clearTickets(): void;

  roundStart(users: number): void;
  roundComplete(balls: IBallList, userWins: readonly IUserWin[]): void;

  setCountdown(countdown: number): void;
  addBalls(...values: number[]): void;
  setWin(value: number): void;
}
