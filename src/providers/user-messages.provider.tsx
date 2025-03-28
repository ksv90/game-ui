import { parse } from '@valibot/valibot';
import { Centrifuge, PublicationContext } from 'centrifuge';
import { PropsWithChildren } from 'react';

import { UserMessage } from '../schemes';
import { MessageServiceProvider } from '../services';

export interface UserMessagesProviderGame {
  changeBet(value: number): void;
  updateBalance(value: number): void;
}

export interface UserMessagesProviderProps {
  readonly game: UserMessagesProviderGame;
  readonly centrifuge: Centrifuge;
  readonly channel?: string;
}

export const UserMessagesProvider = (props: PropsWithChildren<UserMessagesProviderProps>) => {
  const { children, centrifuge, channel, game } = props;

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
    }
  };

  return (
    <MessageServiceProvider centrifuge={centrifuge} channel={channel} handler={handler}>
      {children}
    </MessageServiceProvider>
  );
};
