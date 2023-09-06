import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatService } from './chat.service';


@Module({
  imports: [PrismaModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
