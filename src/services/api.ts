import env from 'env';
import { Configuration } from 'generated';

export const baseConfiguration: Configuration = new Configuration({
  basePath: env.STRONG_AUTO_API_URL,
});

export const createMockResponse = <T>(data: T) =>
  new Promise<T>((resolve) => {
    resolve(data);
  });
