import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { CommunicationProtocolEnum, DaprClient, HttpMethod } from 'dapr-client';

@Controller('')
export class AppController {
  constructor(private readonly daprClient: DaprClient) {}
  @Get('/add-page-view')
  async prderAdd() {
    try {
      console.log('A new page view arrived, publishing');
      await this.daprClient.pubsub.publish('pubsub', 'page-view-add', {
        data: 'TRY',
      });
    } catch (e) {
      console.log(e);
    }
  }
  @Get('/gRpc')
  async gRpc() {
    try {
      console.log('grpc Invocation');
      const result = await this.daprClient.invoker.invoke(
        'page-view', // Target Dapr app ID
        'test/grpc', // The route (method) to call in the target service
        HttpMethod.POST,
        { data: 'TRY' }, // Request payload
      );

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  @Post('/state-save')
  async stateSave(@Body() body: any) {
    try {
      console.log({ body });
      console.log('State Save');
      await this.daprClient.state.save(
        'statestore', // State store
        [{ key: 'order_1', value: JSON.stringify(body) }], // Value
      );
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/state-get')
  async stateGet() {
    try {
      console.log('State Get');
      const result = await this.daprClient.state.get('statestore', 'order_1');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  daprHost = '127.0.0.1';

  @Post('encryption')
  async encryption(@Body() body: any) {
    try {
      console.log({ body });
      const client = new DaprClient({
        daprHost: this.daprHost,
        daprPort: process.env.DAPR_HTTP_PORT,
        communicationProtocol: CommunicationProtocolEnum.GRPC,
      });
      const encrypted = await client.crypto.encrypt(body.message, {
        componentName: 'localstorage',
        keyName: body.key,
        keyWrapAlgorithm: 'RSA',
      });
      console.log({ encrypted });
      return encrypted;
    } catch (e) {
      console.log(e);
      throw new HttpException(e, 500);
    }
  }

  @Get('start-worflow')
  async startWorflow() {
    try {
      const client = new DaprClient({
        daprHost: this.daprHost,
        daprPort: process.env.DAPR_HTTP_PORT,
        communicationProtocol: CommunicationProtocolEnum.GRPC,
      });
      const result = await client.workflow.start(
        'order-workflow',
        'order',
        'order_1',
        {
          data: 'TRY',
        },
      );
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpException(e, 500);
    }
  }
}
