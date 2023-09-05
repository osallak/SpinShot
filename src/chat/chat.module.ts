import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocalRedisModule } from 'src/redis/redis.module';

@Module({
  imports: [PrismaModule, LocalRedisModule],
  providers: [ChatGateway],
})
export class ChatModule {}
