import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PH Mold Server')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // plain object → DTO 자동 변환
      whitelist: true, // DTO에 없는 값 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 값 들어오면 예외
    }),
  );

  await app.listen(8080);
}
bootstrap();
