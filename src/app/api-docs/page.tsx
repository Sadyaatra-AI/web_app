import { createSwaggerSpec } from 'next-swagger-doc';
import ReactSwagger from './ReactSwagger';

export default async function IndexPage() {
  const spec = await createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SADYAATRA API Docs',
        version: '1.0',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [],
    },
  });

  return (
    <section className="container mx-auto mt-12 mb-12 p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-4 text-center text-zinc-900 dark:text-zinc-100">API Documentation</h1>
      <ReactSwagger spec={spec} />
    </section>
  );
}
