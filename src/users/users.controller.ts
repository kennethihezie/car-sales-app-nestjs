import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService: UserService){}

    @Post('/signup')
    createUser(@Body() body: UserDto){
       this.userService.create(body)
    }
}
