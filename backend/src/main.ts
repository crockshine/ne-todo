import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import * as CookieParser from 'cookie-parser'

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // приведение типов
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(CookieParser())

  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NeToDo API')
    .setDescription('API для приложения NeToDo')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  // чтение env
  const config = app.get(ConfigService);
  const CORS = config.getOrThrow<string>('CORS')
  const PORT = config.getOrThrow<string>('PORT')

  // CORS
  app.enableCors({
    origin: CORS,
    credentials: true,
  });

  // взлетаем
  await app.listen(PORT);
})()
