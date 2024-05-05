import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from '../reports/reports.module';
import { User } from '../users/model/user.entity';
import { UsersModule } from '../users/users.module';
import { Report } from '../reports/model/report.entity';
import { APP_PIPE } from '@nestjs/core';
import * as session from 'express-session';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //check the node enviroment if its test or developmet
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
    inject: [ ConfigService ],
    useFactory: (configService: ConfigService) => {            
      return {
        type: 'sqlite',
        database: configService.get<string>('DB_NAME'),
        entities: [ User, Report ],
        synchronize: true
      }
    }
  }), 
    UsersModule, 
    ReportsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue:  new ValidationPipe({
        //to make sure that incoming requests don't have extrnous request on our body.
        whitelist: true
      })
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false
    })).forRoutes('*')
  }
}
