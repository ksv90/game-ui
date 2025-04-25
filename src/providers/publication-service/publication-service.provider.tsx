import { IReceiver, PublicationContext, StateContext } from '@ui/helpers';
import { PropsWithChildren, useEffect, useState } from 'react';

export interface PublicationServiceProviderProps {
  readonly receiver: IReceiver;
  readonly channel?: string;
  readonly onPublication: (ctx: PublicationContext) => void;
}

export const PublicationServiceProvider = (props: PropsWithChildren<PublicationServiceProviderProps>) => {
  const { children, receiver, channel, onPublication: handler } = props;
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
