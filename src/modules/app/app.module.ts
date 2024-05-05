import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from '../reports/reports.module';
import { User } from '../users/model/user.entity';
import { UsersModule } from '../users/users.module';
import { Report } from '../reports/model/report.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [ User, Report ],
    synchronize: true
  }), 
    UsersModule, 
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
