import { IPublicationContext, IReceiver } from '@ui/base';
import { ITicketWin } from '@ui/helpers';
import { BalanceUpdateMessage, BetChangeMessage, UserMessage, WinMessage } from '@ui/schemes';
import { parse } from '@valibot/valibot';
import { PropsWithChildren } from 'react';

import { PublicationServiceProvider } from './publication-service';

export interface UserMessagesProviderGame {
  changeBet(value: number): void;
  updateBalance(value: number): void;
  ticketWins(...ticketWins: ITicketWin[]): void;
  setWin(value: number): void;
}

export interface UserMessagesProviderProps {
  readonly game: UserMessagesProviderGame;
  readonly receiver: IReceiver;
  readonly channel?: string;
}

interface UserMessageMap {
  ['bet-change']: BetChangeMessage;
  ['balance-update']: BalanceUpdateMessage;
  ['win']: WinMessage;
}

const messageHandlerMap: {
  [K in UserMessage['type']]: (game: UserMessagesProviderGame, message: UserMessageMap[K]) => void;
} = {
  'bet-change': (game, message) => {
    game.changeBet(message.bet);
  },
  'balance-update': (game, message) => {
    game.updateBalance(message.balance);
  },
  win: (game, message) => {
    const { totalWin, ticketWins } = message;
    game.ticketWins(...ticketWins);
    game.setWin(totalWin);
  },
};

function messageHandler<T extends UserMessage['type']>(type: T, message: UserMessageMap[T], game: UserMessagesProviderGame) {
  messageHandlerMap[type](game, message);
}

export const UserMessagesProvider = (props: PropsWithChildren<UserMessagesProviderProps>) => {
  const { children, receiver, channel, game } = props;

  const publicationHandler = ({ data }: IPublicationContext) => {
    const message = parse(UserMessage, data);
    messageHandler(message.type, message, game);
  };

  return (
    <PublicationServiceProvider receiver={receiver} channel={channel} onPublication={publicationHandler}>
      {children}
    </PublicationServiceProvider>
  );
};
