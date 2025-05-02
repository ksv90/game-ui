import { IReceiver, ITicket, PublicationContext, ticketTransform } from '@ui/helpers';
import {
  RoomMessage,
  RoundCompleteMessage,
  RoundCountdownMessage,
  RoundProcessMessage,
  RoundStartMessage,
  TicketCancelMessage,
  TicketCreateMessage,
  WinData,
} from '@ui/schemes';
import { parse } from '@valibot/valibot';
import { PropsWithChildren } from 'react';

import { PublicationServiceProvider } from './publication-service';

export interface RoomMessagesProviderGame {
  addTickets(...tickets: ITicket[]): void;
  removeTickets(...ticketIds: string[]): void;

  roundStart(users: number): void;
  roundComplete(numbers: readonly number[], wins: readonly WinData[]): void;

  setCountdown(countdown: number): void;
  addRoundNumbers(...values: number[]): void;
}

export interface RoomMessagesProviderProps {
  readonly game: RoomMessagesProviderGame;
  readonly receiver: IReceiver;
  readonly channel?: string;
}

interface RoomMessageMap {
  'ticket-create': TicketCreateMessage;
  'ticket-cancel': TicketCancelMessage;
  'round-start': RoundStartMessage;
  'round-process': RoundProcessMessage;
  'round-complete': RoundCompleteMessage;
  'round-countdown': RoundCountdownMessage;
}

const messageHandlerMap: {
  [K in RoomMessage['type']]: (game: RoomMessagesProviderGame, message: RoomMessageMap[K]) => void;
} = {
  'ticket-create': (game, message) => {
    game.addTickets(ticketTransform(message.ticket));
  },
  'ticket-cancel': (game, message) => {
    game.removeTickets(message.ticketId);
  },
  'round-start': (game, message) => {
    game.roundStart(message.users);
  },
  'round-process': (game, message) => {
    game.addRoundNumbers(...message.balls);
  },
  'round-complete': (game, message) => {
    game.roundComplete(message.balls, message.userWins);
  },
  'round-countdown': (game, message) => {
    game.setCountdown(message.countdown);
  },
};

function messageHandler<T extends RoomMessage['type']>(type: T, message: RoomMessageMap[T], game: RoomMessagesProviderGame) {
  messageHandlerMap[type](game, message);
}

export const RoomMessagesProvider = (props: PropsWithChildren<RoomMessagesProviderProps>) => {
  const { children, receiver, channel, game } = props;

  const publicationHandler = ({ data }: PublicationContext) => {
    const message = parse(RoomMessage, data);
    messageHandler(message.type, message, game);
  };

  return (
    <PublicationServiceProvider receiver={receiver} channel={channel} onPublication={publicationHandler}>
      {children}
    </PublicationServiceProvider>
  );
};
