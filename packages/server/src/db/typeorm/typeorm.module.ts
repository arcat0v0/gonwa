import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room, User } from '@/db/entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Room, User],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeormModule {}
