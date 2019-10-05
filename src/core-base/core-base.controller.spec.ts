import { Test, TestingModule } from '@nestjs/testing';
import { CoreBaseController } from './core-base.controller';

describe('CoreBase Controller', () => {
  let controller: CoreBaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoreBaseController],
    }).compile();

    controller = module.get<CoreBaseController>(CoreBaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
