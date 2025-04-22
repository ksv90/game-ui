import { useRoundNumbersService } from '@ui/providers';

export function DrawnNumbers() {
  const { roundNumbers } = useRoundNumbersService();

  return <p>drawn numbers {roundNumbers.join(' - ')}</p>;
}
