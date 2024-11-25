import { Controller, Get, Post } from '@nestjs/common';
import { DaprPubSubSubscribe } from 'shared/decorator';

@Controller()
export class PageViewController {
  private readonly data = [];
  constructor() {}
  @Get('grpc')
  getPageView(data: any) {
    console.log('Received gRPC call');
    return { message: 'Page view data' };
  }
  @DaprPubSubSubscribe('pubsub', 'page-view-add')
  addPageView(data: any) {
    console.log(`addPageView executed with data: ${JSON.stringify(data)}`);
    this.data.push(data);
  }
}
