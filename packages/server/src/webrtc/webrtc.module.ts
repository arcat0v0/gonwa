import { Module } from '@nestjs/common';
import { WebrtcApiController } from './api/webrtc-api.controller';
import { LivekitService } from './livekit/livekit.service';
import { MeshService } from './mesh/mesh.service';
import { RedisService } from '@/db/redis/redis.service';
import { RedisModule } from '@/db/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [WebrtcApiController],
  providers: [LivekitService, MeshService, RedisService],
})
export class WebrtcModule {}
