import { Injectable } from '@nestjs/common';

@Injectable()
export class PageViewService {
  getHello(): string {
    return 'Hello World!';
  }
}
