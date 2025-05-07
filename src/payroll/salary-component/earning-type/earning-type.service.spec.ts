import { Test, TestingModule } from '@nestjs/testing';
import { EarningTypeService } from './earning-type.service';

describe('EarningTypeService', () => {
  let service: EarningTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EarningTypeService],
    }).compile();

    service = module.get<EarningTypeService>(EarningTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
