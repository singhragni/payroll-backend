import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.create.dto';

@Controller('user')
export class UserController {
    constructor(private userService : UserService){} 

    @Post()
    async signUp(@Body()  createUserDto:CreateUserDto){
        try{
            //return this.userService.creatUser(createUserDto)
            return {name:"ragini"}
        }
        catch(error){
            throw error;
        }
        
    }  
    
    


}
