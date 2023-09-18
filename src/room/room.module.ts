import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [RoomController],
  imports: [PrismaModule, UserModule],
  providers: [RoomService],
})
export class RoomModule {}
