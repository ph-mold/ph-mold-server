import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const productionWhitelist = [
    'http://phmold.co.kr',
    'http://www.phmold.co.kr',
    'http://api.phmold.co.kr',
    'http://218.148.21.205',
    'http://localhost:5123',
  ];

  const developmentWhitelist = [
    'http://localhost:5123',
    'http://localhost:3000',
    'http://localhost:3001',
  ];

  const whitelist =
    process.env.NODE_ENV === 'production'
      ? productionWhitelist
      : [...productionWhitelist, ...developmentWhitelist];

  const corsOptions: CorsOptions = {
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS 차단: 허용되지 않은 origin입니다.'));
      }
    },
    credentials: true,
  };

  app.enableCors(corsOptions);

  if (process.env.NODE_ENV !== 'production') {
    const cb = new DocumentBuilder();
    cb.setTitle('PH Mold Server').setVersion('1.0');

    if (process.env.APP_ENV !== 'local') {
      cb.addServer(`${process.env.BASE_URL}/apis`);
    }
    cb.addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'JWT access token을 입력하세요.',
        in: 'header',
      },
      'access-token', // <-- 이 key를 기억하세요
    );

    const config = cb.build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  app.use(cookieParser());
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
