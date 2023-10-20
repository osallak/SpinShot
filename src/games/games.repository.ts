import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GamesRepository {

    private readonly logger = new Logger('GamesRepository');
    constructor(private readonly prismaService: PrismaService) {}

    @OnEvent('game.created')
    async saveGame(game: any): Promise<any> {
        const result = await this.prismaService.game.create({
            data: {
                ...game
            }
        });
        return result;
    }
}