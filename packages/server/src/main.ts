import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { remultRouter } from './db/remult';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(remultRouter());
  await app.listen(3001);
}
bootstrap();
