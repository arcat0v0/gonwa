import { Module } from '@nestjs/common';
import { WebrtcApiController } from './api/webrtc-api.controller';
import { LivekitService } from './livekit/livekit.service';
import { MeshService } from './mesh/mesh.service';
import { RedisService } from '@/db/redis/redis.service';
import { UsersService } from '@/users/users.service';
import { RoomsService } from '@/rooms/rooms.service';
import { UsersModule } from '@/users/users.module';
import { RoomsModule } from '@/rooms/rooms.module';

@Module({
  imports: [UsersModule, RoomsModule],
  controllers: [WebrtcApiController],
  providers: [
    LivekitService,
    MeshService,
    RedisService,
    UsersService,
    RoomsService,
  ],
})
export class WebrtcModule {}
