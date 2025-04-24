/* eslint-disable @typescript-eslint/unbound-method */
import { act, render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BalanceService, useBalanceService } from './balance-service.context';
import { BalanceServiceGame, BalanceServiceProvider } from './balance-service.provider';

let mockGame: BalanceServiceGame;
let listeners: Record<'balanceUpdated', Set<(value: number) => void>>;

const Consumer = ({ effect }: { effect?: boolean }) => {
  const { balance, updateBalance } = useBalanceService();

  useEffect(() => {
    if (effect !== true) return;
    updateBalance(200);
  }, [effect, updateBalance]);

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
    render(
      <BalanceServiceProvider game={mockGame} balance={100}>
        <Consumer />
      </BalanceServiceProvider>,
    );

    expect(screen.getByText(/Balance: 100/)).toBeInTheDocument();
  });

  it('должен установить начальное значение в 0, если не передан пропс', () => {
    render(
      <BalanceServiceProvider game={mockGame}>
        <Consumer />
      </BalanceServiceProvider>,
    );

    expect(screen.getByText(/Balance: 0/)).toBeInTheDocument();
  });

  it('должен передавать значение через контекст', () => {
    render(
      <BalanceServiceProvider game={mockGame} balance={100}>
        <Consumer effect={true} />
      </BalanceServiceProvider>,
    );

    expect(mockGame.updateBalance).toHaveBeenCalledWith(200);
  });

  it('должен реагировать на обновление значения', () => {
    render(
      <BalanceServiceProvider game={mockGame} balance={100}>
        <Consumer />
      </BalanceServiceProvider>,
    );

    act(() => {
      mockGame.updateBalance(300);
    });

    expect(screen.getByText(/Balance: 300/)).toBeInTheDocument();
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
    const BrokenConsumer = () => {
      useBalanceService();
      return null;
    };

    expect(() => render(<BrokenConsumer />)).toThrow('balanceService не определен');
  });

  it('не должен пересоздавать service при одинаковых значениях', () => {
    const renders: BalanceService[] = [];

    const Tracker = () => {
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
    const renders: BalanceService[] = [];

    const Tracker = () => {
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
});
