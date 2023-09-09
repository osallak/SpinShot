import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatService } from './chat.service';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [PrismaModule, UserModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
