import { Test, TestingModule } from '@nestjs/testing';
import { CoreBaseService } from './core-base.service';

describe('CoreBaseService', () => {
  let service: CoreBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreBaseService],
    }).compile();

    service = module.get<CoreBaseService>(CoreBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
