import { BaseIssue, BaseSchema, InferOutput, parse } from '@valibot/valibot';

export const errorHandler = (error: unknown): never => {
  throw error;
};

export const getJsonData = (response: Response): Promise<unknown> => {
  return response.json();
};

export const validateData = <const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(
  schema: TSchema,
): ((data: unknown) => InferOutput<TSchema>) => {
  return (data: unknown) => parse(schema, data);
};
