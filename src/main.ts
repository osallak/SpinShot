import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  console.log(process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();

//? if you want to use the logger, just import LoggerService
//? from @nestjs/common and use it in your class
