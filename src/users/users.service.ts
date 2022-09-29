import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './model/user.entity';

@Injectable()
export class UserService {
    //inject typeorm repository into the constructor.
    constructor(@InjectRepository(User) private repository: Repository<User>){}

    create(userDto: UserDto){
       //const { email, password } = userDto
       //creates an instance of the user entity
       //userDto is the same shape with the user class.Because the id is auto generated
       const user = this.repository.create(userDto)

       //save the user data to the database
       return this.repository.save(user)
    }
}
