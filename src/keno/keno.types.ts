import { IGame, IReceiver } from '@ui/base';
import { BallList, ITicket, ITicketWin, IUserWin, SpotIdList } from '@ui/helpers';
import { SessionResponse, TicketCancelResponse, TicketCreateResponse } from '@ui/schemes';

export interface IKenoConnector {
  getSessionData(): Promise<SessionResponse>;

  ticketCreate(bet: number, spots: SpotIdList): Promise<TicketCreateResponse>;

  ticketCancel(ticketId: string): Promise<TicketCancelResponse>;
}

export interface IKenoReceiver extends IReceiver {}

export interface IKenoGameEvents {
  balanceUpdated: [value: number];
  totalBetChanged: [value: number];
  ticketAdded: [ticket: ITicket];
  ticketRemoved: [ticketId: string];
  ticketsCleared: [];
  roundStarted: [{ users: number }];
  roundCompleted: [{ balls: BallList; userWins: readonly IUserWin[] }];
  countdown: [value: number];
  ballAdded: [value: number];
  ballsCleared: [];
  totalWin: [value: number];
}

export interface IKenoGame extends IGame<IKenoGameEvents> {
  updateBalance(value: number): void;
  changeBet(value: number): void;

  addTickets(...tickets: ITicket[]): void;
  removeTickets(...ticketIds: string[]): void;
  ticketWins(...ticketWins: ITicketWin[]): void;
  clearTickets(): void;

  roundStart(users: number): void;
  roundComplete(balls: BallList, userWins: readonly IUserWin[]): void;

  setCountdown(countdown: number): void;
  addBalls(...values: number[]): void;
  setWin(value: number): void;
}
