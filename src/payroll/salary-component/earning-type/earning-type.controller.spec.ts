import { Test, TestingModule } from '@nestjs/testing';
import { EarningTypeController } from './earning-type.controller';

describe('EarningTypeController', () => {
  let controller: EarningTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarningTypeController],
    }).compile();

    controller = module.get<EarningTypeController>(EarningTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
