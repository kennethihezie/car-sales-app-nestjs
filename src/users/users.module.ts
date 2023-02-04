import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './model/user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  //creates the repository
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, AuthService],
  controllers: [UsersController]
})

export class UsersModule {}
