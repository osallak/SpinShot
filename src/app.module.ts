import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import * as Joi from 'joi';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid("development", "production", "test")
        .default("development"),
      PORT: Joi.number().default(3000)
    })
  }), AuthModule, UserModule, PrismaModule],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class AppModule { }
