export interface IConnectorOptions {
  readonly serverUrl: string;
  readonly token: string;
}

export abstract class Connector {
  protected serverUrl_: string;

  protected token_: string;

  constructor(options: IConnectorOptions) {
    this.serverUrl_ = options.serverUrl;
    this.token_ = options.token;
  }

  protected async get_(url: string): Promise<Response> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token_}`,
      },
    });

    if (!response.ok) {
      throw await this.#createError(response);
    }

    return response;
  }

  protected async post_(url: string, data?: unknown): Promise<Response> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token_}`,
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
