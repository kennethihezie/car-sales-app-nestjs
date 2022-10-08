import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserInterceptorDto } from './dto/user.dto.interceptor';
import { UserService } from './users.service';

@Controller('auth')
//Controller level interceptor
@Serialize(UserInterceptorDto)
export class UsersController {
    constructor(private userService: UserService){}

    @Post('/signup')
    createUser(@Body() body: UserDto){
       this.userService.create(body)
    }

    //Handler level interceptor
    //@Serialize(UserInterceptorDto)
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

//Interceptors
/*
Interceptors can be used to intercept outgoing reponses or incoming requests. 
we can have many interceptor intercept a particular incoming or outgoing request.

Interceptors can be applied to a single handler, all the handlers in controller or globally.
*/
