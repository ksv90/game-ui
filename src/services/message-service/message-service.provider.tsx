import type { Centrifuge, PublicationContext, State, StateContext } from 'centrifuge';
import { PropsWithChildren, useEffect, useState } from 'react';

export interface MessageServiceProviderProps {
  readonly centrifuge: Centrifuge;
  readonly channel?: string;
  readonly handler: (ctx: PublicationContext) => void;
}

export const MessageServiceProvider = (props: PropsWithChildren<MessageServiceProviderProps>) => {
  const { children, centrifuge, channel, handler } = props;
  const [connectionState, setConnectionState] = useState(centrifuge.state);

  useEffect(() => {
    const stateChangeHandler = ({ newState }: StateContext) => {
      setConnectionState(newState);
    };
    centrifuge.on('state', stateChangeHandler);
    return () => {
      centrifuge.off('state', stateChangeHandler);
    };
  }, [centrifuge]);

  useEffect(() => {
    if (connectionState !== 'connected' || !channel) return;
    const subscription = centrifuge.newSubscription(channel);
    subscription.on('publication', handler);

    subscription.subscribe();

    return () => {
      subscription.off('publication', handler);
      subscription.unsubscribe();
    };
  }, [centrifuge, channel, connectionState, handler]);

  return <>{children}</>;
};
