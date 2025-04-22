import { IReceiver, PublicationContext } from '@ui/helpers';
import { UserMessage } from '@ui/schemes';
import { parse } from '@valibot/valibot';
import { PropsWithChildren } from 'react';

import { MessageServiceProvider } from './message-service';

export interface UserMessagesProviderGame {
  changeBet(value: number): void;
  updateBalance(value: number): void;
}

export interface UserMessagesProviderProps {
  readonly game: UserMessagesProviderGame;
  readonly receiver: IReceiver;
  readonly channel?: string;
}

export const UserMessagesProvider = (props: PropsWithChildren<UserMessagesProviderProps>) => {
  const { children, receiver, channel, game } = props;

  const handler = ({ data }: PublicationContext) => {
    const userMessage = parse(UserMessage, data);
    switch (userMessage.type) {
      case 'bet-change': {
        const { bet } = userMessage;
        game.changeBet(bet);
        break;
      }
      case 'balance-update': {
        const { balance } = userMessage;
        game.updateBalance(balance);
        break;
      }
      case 'win': {
        const { totalWin, ticketWins } = userMessage;
        // eslint-disable-next-line no-console
        console.log('total win', totalWin, ticketWins);
      }
    }
  };

  return (
    <MessageServiceProvider receiver={receiver} channel={channel} handler={handler}>
      {children}
    </MessageServiceProvider>
  );
};
