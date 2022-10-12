import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');
// import UserMiddleware from './middleware/user.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  // app.use(UserMiddleware);
  await app.listen(8080);
}
bootstrap();
