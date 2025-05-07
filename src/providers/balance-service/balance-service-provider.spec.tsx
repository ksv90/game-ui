/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/unbound-method */
import { act, render } from '@testing-library/react';
import { JSX, useEffect } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BalanceService, useBalanceService } from './balance-service.context';
import { BalanceServiceGame, BalanceServiceProvider } from './balance-service.provider';

let mockGame: BalanceServiceGame;
let listeners: Record<'balanceUpdated', Set<(value: number) => void>>;

const Consumer = (): JSX.Element => {
  const { balance } = useBalanceService();
  return <div>Balance: {balance}</div>;
};

const ConsumerWithEffect = ({ value }: { value: number }): JSX.Element => {
  const { balance, updateBalance } = useBalanceService();

  useEffect(() => {
    updateBalance(value);
  }, [updateBalance, value]);

  return <div>Balance: {balance}</div>;
};

beforeEach(() => {
  listeners = {
    balanceUpdated: new Set(),
  };

  mockGame = {
    on: vi.fn<BalanceServiceGame['on']>((event, listener) => {
      listeners[event].add(listener);
      return mockGame;
    }),
    off: vi.fn<BalanceServiceGame['off']>((event, listener) => {
      listeners[event].delete(listener);
      return mockGame;
    }),
    updateBalance: vi.fn<BalanceServiceGame['updateBalance']>((value) => {
      listeners.balanceUpdated.forEach((listener) => {
        listener(value);
      });
    }),
  };
});

describe('BalanceServiceProvider', () => {
  it('должен установить начальное значение по пропсам', () => {
    const { getByText } = render(
      <BalanceServiceProvider game={mockGame} balance={100}>
        <Consumer />
      </BalanceServiceProvider>,
    );

    expect(getByText(/Balance: 100/)).toBeInTheDocument();
  });

  it('должен установить начальное значение в 0, если не передан пропс', () => {
    const { getByText } = render(
      <BalanceServiceProvider game={mockGame}>
        <Consumer />
      </BalanceServiceProvider>,
    );

    expect(getByText(/Balance: 0/)).toBeInTheDocument();
  });

  it('должен передавать значение через контекст', () => {
    render(
      <BalanceServiceProvider game={mockGame} balance={100}>
        <ConsumerWithEffect value={200} />
      </BalanceServiceProvider>,
    );

    expect(mockGame.updateBalance).toHaveBeenCalledWith(200);
  });

  it('должен реагировать на обновление значения', () => {
    const { getByText } = render(
      <BalanceServiceProvider game={mockGame} balance={100}>
        <Consumer />
      </BalanceServiceProvider>,
    );

    act(() => {
      mockGame.updateBalance(300);
    });

    expect(getByText(/Balance: 300/)).toBeInTheDocument();
  });

  it('должен отписаться от событий при размонтировании', () => {
    const { unmount } = render(
      <BalanceServiceProvider game={mockGame}>
        <Consumer />
      </BalanceServiceProvider>,
    );

    unmount();

    expect(mockGame.off).toHaveBeenCalledWith('balanceUpdated', expect.any(Function));
  });

  it('должен удалить слушателя из listeners при размонтировании', () => {
    const { unmount } = render(
      <BalanceServiceProvider game={mockGame}>
        <Consumer />
      </BalanceServiceProvider>,
    );

    expect(listeners.balanceUpdated.size).toBe(1);

    unmount();

    expect(listeners.balanceUpdated.size).toBe(0);
  });

  it('должен бросить ошибку, если service вызывается вне провайдера', () => {
    const BrokenConsumer = (): JSX.Element | null => {
      useBalanceService();
      return null;
    };

    expect(() => render(<BrokenConsumer />)).toThrow('balanceService не определен');
  });

  it('не должен пересоздавать service при одинаковых значениях', () => {
    const renders: BalanceService[] = [];

    const Tracker = (): JSX.Element => {
      const service = useBalanceService();
      useEffect(() => {
        renders.push(service);
      }, [service]);
      return <div>Balance: {service.balance}</div>;
    };

    render(
      <BalanceServiceProvider game={mockGame} balance={400}>
        <Tracker />
      </BalanceServiceProvider>,
    );

    act(() => {
      mockGame.updateBalance(400);
    });

    expect(renders.length).toBe(1);
  });

  it('не должен пересоздавать service при одинаковых пропсах', () => {
    const renders = new Array<BalanceService>();

    const Tracker = (): JSX.Element => {
      const service = useBalanceService();
      useEffect(() => {
        renders.push(service);
      }, [service]);
      return <div>Balance: {service.balance}</div>;
    };

    const { rerender } = render(
      <BalanceServiceProvider game={mockGame} balance={500}>
        <Tracker />
      </BalanceServiceProvider>,
    );

    rerender(
      <BalanceServiceProvider game={mockGame} balance={500}>
        <Tracker />
      </BalanceServiceProvider>,
    );

    expect(renders.length).toBe(1);
  });

  it('должен обновить значение при новом пропсе', () => {
    const { rerender, getByText } = render(
      <BalanceServiceProvider game={mockGame} balance={500}>
        <Consumer />
      </BalanceServiceProvider>,
    );

    rerender(
      <BalanceServiceProvider game={mockGame} balance={400}>
        <Consumer />
      </BalanceServiceProvider>,
    );

    expect(getByText(/Balance: 400/)).toBeInTheDocument();
  });
});
