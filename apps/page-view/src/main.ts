import { NestFactory } from '@nestjs/core';
import { PageViewModule } from './page-view.module';
import { useDaprPubSubListener } from 'shared/decorator';
import { DaprServer, HttpMethod } from 'dapr-client';

async function bootstrap() {
  const app = await NestFactory.create(PageViewModule);
  const server = app.get(DaprServer); // Get the DaprServer instance from DI
  await useDaprPubSubListener(app); // This is your custom decorator setup
  await server.start(); // Start the DaprServer

  await server.invoker.listen(
    'hello-world',
    async (data: any) => {
      console.log('[Dapr-JS][Example] Received Hello World Method Call');
      console.log(`[Dapr-JS][Example] Data: ${JSON.stringify(data.body)}`);
      console.log(`[Dapr-JS][Example] Replying to the client`);
      return { hello: 'world received' };
    },
    { method: HttpMethod.POST },
  );
}
bootstrap();
