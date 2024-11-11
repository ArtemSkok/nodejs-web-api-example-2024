import fastify from 'fastify';
import {
  type FastifyZodOpenApiSchema,
  type FastifyZodOpenApiTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-zod-openapi';
import { z } from 'zod';
import 'zod-openapi/extend';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import {
  fastifyZodOpenApiPlugin,
  fastifyZodOpenApiTransform,
  fastifyZodOpenApiTransformObject,
} from 'fastify-zod-openapi';
import { type ZodOpenApiVersion } from 'zod-openapi';

import { config } from './config';

export async function createApp() {
  const defaultUsername = (await config).DEFAULT_USERNAME;

  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(fastifyZodOpenApiPlugin);
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'An API for greetings.',
        version: '1.0.0',
      },
      openapi: '3.1.0' satisfies ZodOpenApiVersion, // If this is not specified, it will default to 3.1.0
    },
    transform: fastifyZodOpenApiTransform,
    transformObject: fastifyZodOpenApiTransformObject,
  });
  await app.register(fastifySwaggerUI, {
    routePrefix: '/documentation',
  });

  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: 'GET',
    url: '/greeting',
    schema: {
      querystring: z.object({
        name: z.string().optional().openapi({
          description: 'Your Name.',
          example: defaultUsername,
        }),
      }),

      response: {
        201: z.object({
          greeting: z.string().openapi({
            description: 'A personalised greeting.',
            example: `Hi, ${defaultUsername}`,
          }),
        }),
      },
    } satisfies FastifyZodOpenApiSchema,
    handler: async (req, res) => {
      await res.send({ greeting: `Hi, ${req.query.name || defaultUsername}!` });
    },
  });

  return app;
}
