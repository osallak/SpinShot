import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatService } from './chat.service';
import { UserModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';


@Module({
  imports: [PrismaModule, UserModule, NotificationModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
