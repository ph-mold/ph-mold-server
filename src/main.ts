import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  if (process.env.NODE_ENV !== 'production') {
    const cb = new DocumentBuilder();
    cb.setTitle('PH Mold Server').setVersion('1.0');

    if (process.env.APP_ENV !== 'local') {
      cb.addServer(`${process.env.BASE_URL}/apis`);
    }

    const config = cb.build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  await app.listen(3001);
}
bootstrap();
