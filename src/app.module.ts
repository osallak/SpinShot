import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid("development", "production", "test")
        .default("development"),
      PORT: Joi.number()
    })
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
