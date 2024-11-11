import path from 'path';
import z from 'zod';
import { loadConfig } from 'zod-config';
import { dotEnvAdapter } from 'zod-config/dotenv-adapter';

const configSchema = z.object({
  PORT: z
    .preprocess(
      (x) => parseInt(x as string),
      z.number().int().min(0).max(99999),
    )
    .default(8080),
  HOST: z.string().url().default('http://localhost'),
  DEFAULT_USERNAME: z.string().default('USERNAME'),
});

export type Config = z.infer<typeof configSchema>;

const filePath = path.join(process.cwd(), '.env');

async function loadAppConfig(): Promise<Config> {
  return await loadConfig({
    schema: configSchema,
    adapters: [dotEnvAdapter({ path: filePath })],
  });
}

export const config: Promise<Config> = loadAppConfig();
