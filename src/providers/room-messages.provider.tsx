import { IReceiver, PublicationContext, Ticket, ticketTransform } from '@ui/helpers';
import { parse } from '@valibot/valibot';
import { PropsWithChildren } from 'react';

import { RoomMessage, WinData } from '../schemes';
import { MessageServiceProvider } from './message-service';

export interface RoomMessagesProviderGame {
  addTickets(...tickets: Ticket[]): void;
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

export const RoomMessagesProvider = (props: PropsWithChildren<RoomMessagesProviderProps>) => {
  const { children, receiver, channel, game } = props;

  const handler = ({ data }: PublicationContext) => {
    const roomMessage = parse(RoomMessage, data);
    switch (roomMessage.type) {
      case 'ticket-create': {
        const { ticket } = roomMessage;
        game.addTickets(ticketTransform(ticket));
        break;
      }

      case 'ticket-cancel': {
        const { ticketId } = roomMessage;
        game.removeTickets(ticketId);
        break;
      }

      case 'round-start': {
        const { users } = roomMessage;
        game.roundStart(users);
        break;
      }

      case 'round-process': {
        const { numbers } = roomMessage;
        game.addRoundNumbers(...numbers);
        break;
      }

      case 'round-complete': {
        const { numbers, wins } = roomMessage;
        game.roundComplete(numbers, wins);
        break;
      }

      case 'round-countdown': {
        const { countdown } = roomMessage;
        game.setCountdown(countdown);
        break;
      }
    }
  };

  return (
    <MessageServiceProvider receiver={receiver} channel={channel} handler={handler}>
      {children}
    </MessageServiceProvider>
  );
};
