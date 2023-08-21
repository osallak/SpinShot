import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { emit } from 'process';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Prisma');

  async onModuleInit() : Promise<void>{
    try {
      await this.$connect();
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit' as never, async () => {
      try {
        await app.close();
      } catch (e) {
        this.logger.error(e.message);
      }
    });
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
