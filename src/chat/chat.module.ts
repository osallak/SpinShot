import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatService } from './chat.service';
import { UserModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';
import { ChatController } from './chat.controller';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [PrismaModule, UserModule, NotificationModule, RoomModule],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
