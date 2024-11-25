import { Test, TestingModule } from '@nestjs/testing';
import { PageViewController } from './page-view.controller';
import { PageViewService } from './page-view.service';

describe('PageViewController', () => {
  let pageViewController: PageViewController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PageViewController],
      providers: [PageViewService],
    }).compile();

    pageViewController = app.get<PageViewController>(PageViewController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pageViewController.getHello()).toBe('Hello World!');
    });
  });
});
