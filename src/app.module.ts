import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserController } from './user/controller/user.controller';
import { UserModule } from './user/user.module';
import { StorageModule } from './storage/storage.module';
import { MediaModule } from './media/media.module';
import { MediaController } from './media/media.controller';
import { RedisModule } from '@songkeys/nestjs-redis';
import { ONLY_HOST, REDIS_PORT } from './global/constants/global.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      },
    }),
    AuthModule,
    UserModule,
    StorageModule,
    MediaModule,
    RedisModule.forRoot({
      config: {
        host: ONLY_HOST,
        port: REDIS_PORT
      }
    })
  ],
  controllers: [AuthController, UserController, MediaController],
  providers: [PrismaService],
})
export class AppModule {}
