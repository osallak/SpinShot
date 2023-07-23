import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  exports: [UserService],
  providers: [UserService, PrismaService],
})
export class UserModule {}
