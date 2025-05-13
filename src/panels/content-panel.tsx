import { Writable } from '@game-ui/base';
import { Balance, Countdown, ISpotData, ITicketData, TicketList } from '@game-ui/components';
import { useBalanceService, useBallsService, useStateService, useTicketService } from '@game-ui/providers';
import { JSX, PropsWithChildren, useMemo } from 'react';

export interface ContentProps {
  readonly onRemove: (ticketId: string) => void;
}

export function ContentPanel({ onRemove }: PropsWithChildren<ContentProps>): JSX.Element {
  const { tickets } = useTicketService();
  const { state } = useStateService();
  const { balls } = useBallsService();
  const { balance } = useBalanceService();

  const ticketDataList = useMemo(() => {
    return tickets.map<ITicketData>(({ ticketId, bet, spots }) => ({
      id: ticketId,
      totalBet: `${String(bet)} EUR`,
      variant: state === 'pending' ? 'default' : 'disabled',
      spots: spots.map<ISpotData>((id) => {
        const spotData: Writable<ISpotData> = { id, variant: 'disabled' };
        if (balls.includes(id)) spotData.variant = 'drawn';
        return spotData;
      }),
    }));
  }, [balls, state, tickets]);

  return (
    <>
      <div></div>
      <div>
        <Balance balance={balance} />
      </div>
      <div>{state === 'pending' ? <Countdown /> : <p>process</p>}</div>
      <TicketList tickets={ticketDataList} onClick={onRemove} />
    </>
  );
}
