import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GamesGateway } from './games.gateway';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [GamesController],
  providers: [GamesService, PrismaService, GamesGateway],
})
export class GamesModule {}
