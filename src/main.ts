import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  HOST,
  ONLY_HOST,
  REDIS_PORT,
} from './global/constants/global.constants';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    cors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true,
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const redisMicroService = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: ONLY_HOST,
      port: REDIS_PORT,
    },
  });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('SpinShot API')
    .setDescription('SpinShot API description')
    .setVersion('1.0')
    .addTag('SpinShot')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}
bootstrap().catch();
