import { Controller, Get, Post } from '@nestjs/common';
import { DaprPubSubSubscribe } from 'shared/decorator';

@Controller('test')
export class GrpcController {
  private readonly data = [];
  constructor() {}
  @Get('grpc')
  async getPageView(data: any) {
    console.log('Received gRPC call');
    return { message: 'Page view data' };
  }
}
