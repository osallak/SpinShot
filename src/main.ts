import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SpelunkerModule } from 'nestjs-spelunker';
import { error } from 'console';
const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    cors: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SpinShot')
    .setDescription('SpinShot api docs')
    .setVersion('0.0')
    .addTag('SpinShot')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(cookieParser());
  app.enableCors();
  await app.listen(process.env.PORT);
  //spelunker
  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  const mermaidEdges = edges.map(
    ({ from, to }) => `  ${from.module.name}-->${to.module.name}`,
  );
  
  const graphOut = mermaidEdges.join('\n');
  fs.writeFileSync('graph.mmd', 'graph LR\n' + graphOut, err => console.log(err));
  //end spelunker
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch();