import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './db/redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { WebrtcModule } from './webrtc/webrtc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 使配置模块在全局可用
      envFilePath: ['.env'], // 环境变量文件路径
    }),
    RedisModule,
    WebrtcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
