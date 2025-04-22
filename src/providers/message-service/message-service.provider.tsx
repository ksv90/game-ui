import { IReceiver, PublicationContext, StateContext } from '@ui/helpers';
import { PropsWithChildren, useEffect, useState } from 'react';

export interface MessageServiceProviderProps {
  readonly receiver: IReceiver;
  readonly channel?: string;
  readonly handler: (ctx: PublicationContext) => void;
}

export const MessageServiceProvider = (props: PropsWithChildren<MessageServiceProviderProps>) => {
  const { children, receiver, channel, handler } = props;
  const [connectionState, setConnectionState] = useState(receiver.state);

  useEffect(() => {
    const stateChangeHandler = ({ newState }: StateContext) => {
      setConnectionState(newState);
    };
    receiver.on('state', stateChangeHandler);
    return () => {
      receiver.off('state', stateChangeHandler);
    };
  }, [receiver]);

  useEffect(() => {
    if (connectionState !== 'connected' || !channel) return;
    const subscription = receiver.newSubscription(channel);
    subscription.on('publication', handler);

    subscription.subscribe();

    return () => {
      subscription.off('publication', handler);
      subscription.unsubscribe();
    };
  }, [receiver, channel, connectionState, handler]);

  return <>{children}</>;
};
