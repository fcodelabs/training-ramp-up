import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');

// Use this after the variable declaration
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
