import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UsersController } from './users.controller';

@Module({
  //creates the repository
  imports: [TypeOrmModule.forFeature([User])],
  
  controllers: [UsersController]
})
export class UsersModule {}
