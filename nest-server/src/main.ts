import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');
// import userMiddleware from './middleware/user.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.setGlobalPrefix('api');
  // app.use(userMiddleware);
  await app.listen(3000);
}
bootstrap();
