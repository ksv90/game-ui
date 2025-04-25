import { StateMachineConfig } from '@ksv90/fsm';
import { TicketWinData } from '@ui/schemes';

import { MessengerMock } from './messenger';

export type RoundMachineStateName = 'init' | 'countdown' | 'roundStart' | 'roundProcess' | 'roundClose';

export type RoundMachineEventType = 'NEXT' | 'COMPLETE';

export interface RoundMachineContext {
  get mode(): number;
  get countdown(): number;
  get roundNumbers(): Iterable<number>;
  countdownDecrement(): void;
  addRoundNumber(): number;
  isRoundReady(): boolean;
  winsCalculate(): { totalWin: number; ticketWins: TicketWinData[] };
  roundStart(): void;
  roundClose(): void;
}

function log({ mode }: RoundMachineContext, { stateName }: { stateName: RoundMachineStateName }) {
  // eslint-disable-next-line no-console
  if (mode) console.log(stateName);
}

function wait(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function sec(): Promise<void> {
  await wait(1_000);
}

export const createRoundMachineConfig = <TContext extends RoundMachineContext>(
  messenger: MessengerMock,
  context: TContext,
): StateMachineConfig<RoundMachineStateName, RoundMachineEventType, TContext> => {
  return {
    context,
    initState: 'init',
    states: {
      init: {
        entry: [log],
        job: async () => {
          await sec();
        },
        on: {
          COMPLETE: [{ target: 'countdown' }],
        },
        emit: [{ eventType: 'COMPLETE' }],
      },
      countdown: {
        entry: [log],
        job: async (ctx) => {
          messenger.sendRoundCountdown(ctx.countdown);
          await sec();
          ctx.countdownDecrement();
        },
        on: {
          COMPLETE: [{ target: 'roundStart', cond: (ctx) => !ctx.countdown }, { target: 'countdown' }],
        },
        emit: [{ eventType: 'COMPLETE' }],
      },
      roundStart: {
        entry: [log],
        job: (ctx) => {
          ctx.roundStart();
          messenger.sendRoundStart(Math.floor(Math.random() * 10) + 1);
        },
        on: {
          COMPLETE: [{ target: 'roundProcess' }],
        },
        emit: [{ eventType: 'COMPLETE' }],
      },
      roundProcess: {
        entry: [log],
        job: async (ctx) => {
          const value = ctx.addRoundNumber();
          messenger.sendRoundProcess(value, Array.from(ctx.roundNumbers));
          await sec();
        },
        on: {
          COMPLETE: [{ target: 'roundClose', cond: (ctx) => ctx.isRoundReady() }, { target: 'roundProcess' }],
        },
        emit: [{ eventType: 'COMPLETE' }],
      },
      roundClose: {
        entry: [log],
        job: (ctx) => {
          const { totalWin, ticketWins } = ctx.winsCalculate();
          ctx.roundClose();
          messenger.sendWin(totalWin, ticketWins);
          messenger.sendRoundComplete(Array.from(ctx.roundNumbers), totalWin ? [{ userName: '', win: totalWin }] : []);
        },
        on: {
          COMPLETE: [{ target: 'countdown' }],
        },
        emit: [{ eventType: 'COMPLETE' }],
      },
    },
  };
};
