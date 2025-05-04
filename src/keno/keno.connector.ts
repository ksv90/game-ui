import { IKenoConnector } from '@ui/helpers';
import { SessionResponse, TicketCancelResponse, TicketCreateResponse } from '@ui/schemes';
import { parse } from '@valibot/valibot';

export interface ConnectorOptions {
  readonly serverUrl: string;
  readonly token: string;
}

export class KenoConnector implements IKenoConnector {
  #serverUrl: string;

  #token: string;

  constructor(options: ConnectorOptions) {
    this.#serverUrl = options.serverUrl;
    this.#token = options.token;
  }

  async getSessionData(): Promise<SessionResponse> {
    const response = await this.#get(`${this.#serverUrl}/game/init`);
    const sessionResponse = parse(SessionResponse, await response.json());
    return sessionResponse;
  }

  async ticketCreate(bet: number, spots: readonly number[]): Promise<TicketCreateResponse> {
    const response = await this.#post(`${this.#serverUrl}/ticket/create`, { bet, spots });
    const ticketCreateResponse = parse(TicketCreateResponse, await response.json());
    return ticketCreateResponse;
  }

  async ticketCancel(ticketId: string): Promise<TicketCancelResponse> {
    const response = await this.#post(`${this.#serverUrl}/ticket/cancel`, { ticketId });
    const ticketCancelResponse = parse(TicketCancelResponse, await response.json());
    return ticketCancelResponse;
  }

  async #get(url: string): Promise<Response> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.#token}`,
      },
    });

    if (!response.ok) {
      throw await this.#createError(response);
    }

    return response;
  }

  async #post(url: string, data?: unknown): Promise<Response> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw await this.#createError(response);
    }

    return response;
  }

  async #createError(response: Response): Promise<Error> {
    const { error, message } = (await response.json()) as { error: string; message: string; statusCode: number };
    return new Error(message, { cause: error });
  }
}
