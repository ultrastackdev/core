/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 400,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) => Object.values(error.constraints));
        return new BadRequestException({ message: messages, error: 'Bad Request', statusCode: 400 });
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('ULTRA STACK APIs')
    .setDescription('ULTRA STACK  description')
    .setVersion('1.0')
    .addTag('ULTRA STACK ')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 9000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
