import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import * as Joi from 'joi';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MailerModule } from '@nestjs-modules/mailer';
import { MAIL_USER, MAIL_PASS } from './global/global.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
      },
    }),
    AuthModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
