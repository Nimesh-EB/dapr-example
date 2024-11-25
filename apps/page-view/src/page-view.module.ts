import { Module } from '@nestjs/common';
import { PageViewController } from './page-view.controller';
import { PageViewService } from './page-view.service';
import { DaprClient, DaprServer } from 'dapr-client';
import { GrpcController } from './grpc.contoller';

@Module({
  imports: [],
  controllers: [PageViewController, GrpcController],
  providers: [
    PageViewService,
    {
      provide: DaprClient,
      useValue: new DaprClient(),
    },
    {
      provide: DaprServer,
      useFactory: () => {
        const server = new DaprServer(); // Initialize DaprServer
        return server;
      },
    },
  ],
})
export class PageViewModule {}
