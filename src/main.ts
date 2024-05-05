import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module'; 
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //to make sure that incoming requests don't have extrnous request on our body.
      whitelist: true
    })
  )

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false
    })
  )
  await app.listen(process.env.PORT || 3000);
}

bootstrap();

/*
Order of execution from an incoming request

Middlewares
Guards
Interceptors
*/
