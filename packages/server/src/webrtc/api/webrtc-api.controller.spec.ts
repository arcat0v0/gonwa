import { Test, TestingModule } from '@nestjs/testing';
import { WebrtcApiController } from './webrtc-api.controller';

describe('WebrtcApiController', () => {
  let controller: WebrtcApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebrtcApiController],
    }).compile();

    controller = module.get<WebrtcApiController>(WebrtcApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
