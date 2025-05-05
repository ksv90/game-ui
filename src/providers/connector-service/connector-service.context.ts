import { SpotIdList } from '@ui/helpers';
import { createContext, useContext } from 'react';

export interface ConnectorService {
  get getSessionData(): () => void;
  get ticketCreate(): (bet: number, spots: SpotIdList) => void;
  get ticketCancel(): (ticketId: string) => void;
}

export const ConnectorServiceContext = createContext<ConnectorService | null>(null);

export const useConnectorService = () => {
  const connectorService = useContext(ConnectorServiceContext);
  if (!connectorService) {
    throw new Error('connectorService не определен');
  }
  return connectorService;
};
