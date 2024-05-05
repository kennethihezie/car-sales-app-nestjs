import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module'; 


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();

/*
Order of execution from an incoming request

Middlewares
Guards
Interceptors
*/
