import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserInterceptorDto } from './dto/user.dto.interceptor';
import { UserService } from './users.service';

@Controller('auth')
//Controller level interceptor
@Serialize(UserInterceptorDto)
export class UsersController {
    constructor(private userService: UserService, private authService: AuthService){}

    @Post('/signup')
    createUser(@Body() body: UserDto){
       return this.authService.signUp(body)
    //    this.userService.create(body)
    }

    @Post('/login')
    loginUser(@Body() body: UserDto){
        return this.authService.logIn(body)
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
    getAllUserEmail(@Query('email') email: string){
        return this.userService.getAllUserEmail(email)
    }

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id)
    }

    @Patch('/:id')
    updateAUser(@Param('id') id: string,  @Body() updateUserDto: UpdateUserDto){
       return this.userService.updateUser(id, updateUserDto)
    }


    //Learning session.
    // @Get('/colors/:color')
    // setColor(@Param('color') color: string, @Session() session: any){
    //     session.color = color
    // }

    // @Get('/colors')
    // getColors(@Session() session: any){
    //     return session.color
    // }
}

/*
  @Get()
  getHello(@Session() session: { views?: number }) {
    session.views = (session.views || 0) + 1;
    return session.views;
  }
*/

//Interceptors
/*
Interceptors can be used to intercept outgoing reponses or incoming requests. 
we can have many interceptor intercept a particular incoming or outgoing request.

Interceptors can be applied to a single handler, all the handlers in controller or globally.
*/
