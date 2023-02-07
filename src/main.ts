import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    //A key can be any random string used to encrypt an data.
    keys: ['Azreal']
  }))
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
