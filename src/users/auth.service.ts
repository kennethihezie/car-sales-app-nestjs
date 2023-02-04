import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "./users.service";

@Injectable()
export class AuthService{
  constructor(private userService: UserService){}

  async signUp(email: string, password: string){
    //TODO See if email is in use.
    const users = await this.userService.getAllUsers(email)
    if(users.length){
        throw new BadRequestException('Email in use')
    }
    //TODO Hash the users password.
    
    //TODO Create a new user and save it.
    //TODO return the user.
  }

  logIn(){

  }
}