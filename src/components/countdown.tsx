import { useCountdownService } from '@ui/providers';
import { JSX } from 'react';

export function Countdown(): JSX.Element {
  const { countdown } = useCountdownService();

  return <p>countdown {countdown}</p>;
}
