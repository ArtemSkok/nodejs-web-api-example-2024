import { config } from './config';
import { createApp } from './app';

async function start() {
  const appConfig = await config;

  const app = await createApp();

  await app.ready();

  await app.listen({ port: appConfig.PORT });

  console.log(
    `Application is listening on ${appConfig.HOST}:${appConfig.PORT}`,
  );

  console.log(
    `Try it out on ${appConfig.HOST}:${appConfig.PORT}/documentation`,
  );
}

start();
