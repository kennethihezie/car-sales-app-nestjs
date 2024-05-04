import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/modules/users/users.module';
import { ReportsModule } from 'src/modules/reports/reports.module';
import { User } from 'src/modules/users/model/user.entity';
import { Report } from 'src/modules/reports/model/report.entity';
import { CookieSessionModule } from 'nestjs-cookie-session';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [ User, Report ],
    synchronize: true
  }), 
  CookieSessionModule.forRoot({ session: { secret: 'qwerty' } }),
    UsersModule, 
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
