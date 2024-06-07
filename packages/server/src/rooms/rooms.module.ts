import { Room } from '@/db/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomsService],
  exports: [TypeOrmModule],
})
export class RoomsModule {}
