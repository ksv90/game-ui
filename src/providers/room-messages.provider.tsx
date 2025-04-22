import { IReceiver, PublicationContext, Ticket, ticketTransform } from '@ui/helpers';
import { parse } from '@valibot/valibot';
import { PropsWithChildren } from 'react';

import { RoomMessage } from '../schemes';
import { MessageServiceProvider } from './message-service';

export interface RoomMessagesProviderGame {
  addTickets(...tickets: Ticket[]): void;
  removeTickets(...ticketIds: string[]): void;
  roundStart(): void;
  roundComplete(numbers: readonly number[]): void;
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
        game.roundStart();
        break;
      }

      case 'round-process': {
        const { added, numbers } = roomMessage;
        // eslint-disable-next-line no-console
        console.log('round-process', added, numbers);
        break;
      }

      case 'round-complete': {
        const { numbers, wins } = roomMessage;
        game.roundComplete(numbers);
        // eslint-disable-next-line no-console
        console.log('round win', wins);
        break;
      }

      case 'round-countdown': {
        const { countdown } = roomMessage;
        // eslint-disable-next-line no-console
        console.log('round-countdown', countdown);
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
