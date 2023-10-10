import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';
import { MediaController } from './media/media.controller';
import { MediaModule } from './media/media.module';
import { PrismaService } from './prisma/prisma.service';
import { StorageModule } from './storage/storage.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

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
    FriendsModule,
  ],
  controllers: [AuthController, UserController, MediaController],
  providers: [PrismaService],
})
export class AppModule {}
