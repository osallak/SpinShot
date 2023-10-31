import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import  cookieParser from 'cookie-parser';
import { PrismaExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: "*",//todo: change to frontend url
    credentials: true,
  });//todo: add cors config
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));
  const config = new DocumentBuilder()
    .setTitle('SpinShot API')
    .setDescription('SpinShot API description')
    .setVersion('1.0')
    .addTag('SpinShot')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap().catch();
