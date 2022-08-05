import { NestFactory } from '@nestjs/core';
import { FileUploaderModule } from './file-uploader.module';

async function bootstrap() {
  const app = await NestFactory.create(FileUploaderModule);
  await app.listen(4000);
}
bootstrap();
