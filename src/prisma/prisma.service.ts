import {
  INestApplication,
  Injectable,
  OnModuleInit
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
    } catch (e) {}
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit' as never, async () => {
      try {
        await app.close();
      } catch (e) {}
    });
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
    } catch (e) {}
  }
}
