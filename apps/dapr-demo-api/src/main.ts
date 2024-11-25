import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommunicationProtocolEnum, DaprClient } from 'dapr-client';
const daprHost = '127.0.0.1';
async function bootstrap() {
  const client = new DaprClient({
    daprHost,
    daprPort: process.env.DAPR_HTTP_PORT,
    communicationProtocol: CommunicationProtocolEnum.HTTP,
  });
  const SECRET_STORE_NAME = 'localsecretstore';
  //Using Dapr SDK to get a secret
  // const secret:  = await client.secret.get(
  //   SECRET_STORE_NAME,
  //   'secret',
  // );
  const PORT: any = await client.secret.get(SECRET_STORE_NAME, 'port');
  console.log({ port: PORT.port });

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT.port || 3000);
}
bootstrap();
