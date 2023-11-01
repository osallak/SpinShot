import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GamesGateway } from './games.gateway';
import { PrismaService } from 'nestjs-prisma';
import { GamesRepository } from './games.repository';

@Module({
  controllers: [GamesController],
  providers: [GamesService, PrismaService, GamesGateway, GamesRepository],
})
export class GamesModule {}
