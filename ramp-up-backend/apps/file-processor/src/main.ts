import { NestFactory } from '@nestjs/core';
import { FileProcessorModule } from './file-processor.module';

async function bootstrap() {
  const app = await NestFactory.create(FileProcessorModule);
  await app.listen(4500);
}
bootstrap();
