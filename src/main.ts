import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //using global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      //to make that incoming requests don't have extrnous request on our body.
      whitelist: true
    })
  )
  await app.listen(3000);
}
bootstrap();
