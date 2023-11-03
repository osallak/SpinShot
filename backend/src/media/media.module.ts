import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageModule } from 'src/storage/storage.module';
import { UserService } from 'src/user/user.service';
import { MediaController } from './media.controller';

@Module({
  imports: [StorageModule],
  providers: [UserService, PrismaService],
  controllers: [MediaController],
})
export class MediaModule {}
