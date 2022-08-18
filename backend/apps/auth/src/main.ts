import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "*",
    credentials: true
  })
  await app.listen(5400);
}
bootstrap();
