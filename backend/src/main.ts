import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const CORS = process.env.CORS || 'http://localhost:3000';
const PORT = process.env.PORT || 8000


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: CORS,
  });

  // приведение типов
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // swagger
  const config = new DocumentBuilder()
    .setTitle('NeToDo API')
    .setDescription('API для приложения NeToDo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // взлетаем
  await app.listen(PORT);
}
bootstrap();
