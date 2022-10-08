import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  //creates the repository
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UsersController]
})

export class UsersModule {}
