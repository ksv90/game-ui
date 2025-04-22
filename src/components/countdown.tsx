import { useCountdownService } from '@ui/providers';

export function Countdown() {
  const { countdown } = useCountdownService();

  return <p>countdown {countdown}</p>;
}
