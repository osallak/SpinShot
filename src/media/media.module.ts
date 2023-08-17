import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [UserService, PrismaService],
  controllers: [MediaController],
})
export class MediaModule {}
