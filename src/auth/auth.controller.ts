import { Body, Controller, Post,BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';

@Controller()
export class AuthController {
    constructor(
        private userService: UserService
    ){}

    @Post('register')
    async register(@Body() body:RegisterDto){

        if(body.password !== body.password_confirm)
        {
            throw new BadRequestException('Passwords did not match')
        }
        else{
            
            try{
                const {password} = body;
                console.log(password);
                const hash_password = await bcrypt.hash(password, 12)
                
                return this.userService.create({
                    first_name: body.first_name,
                    last_name: body.last_name,
                    email: body.email,
                    password: hash_password
                });
            }catch(err)
            {
                console.log("error is: "+err)
            }
           
        }

       
    }
}
