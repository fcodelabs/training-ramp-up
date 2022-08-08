import { NestFactory } from '@nestjs/core';
import { FileProcessingModule } from './file-processing.module';

async function bootstrap() {
  const app = await NestFactory.create(FileProcessingModule)
  await app.listen(5200);
}
bootstrap();