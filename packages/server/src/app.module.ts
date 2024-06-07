import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WebrtcModule } from './webrtc/webrtc.module';
import { UsersModule } from './users/users.module';
import { TypeormModule } from './db/typeorm/typeorm.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 使配置模块在全局可用
      envFilePath: ['.env'], // 环境变量文件路径
    }),
    WebrtcModule,
    TypeormModule,
    UsersModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
