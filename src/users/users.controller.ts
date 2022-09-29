import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService: UserService){}

    @Post('/signup')
    createUser(@Body() body: UserDto){
       this.userService.create(body)
    }

    @Get('/:id')
    getUserById(@Param('id') id: string){
        const user = this.userService.getUserById(id)
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user
    }

    @Get()
    getAllUsers(@Query('email') email: string){
        return this.userService.getAllUsers(email)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id)
    }

    @Patch('/:id')
    updateAUser(@Param('id') id: string,  @Body() updateUserDto: UpdateUserDto){
       return this.userService.updateUser(id, updateUserDto)
    }
}
