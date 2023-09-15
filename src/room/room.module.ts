import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RoomController],
  imports: [PrismaModule],
  providers: [RoomService],
})
export class RoomModule {}
