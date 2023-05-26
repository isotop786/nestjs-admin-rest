import { Injectable,BadRequestException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { User } from './models/user.entity';
import {Repository} from 'typeorm'


@Injectable()
export class UserService {
    constructor
    (
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    // fecthing all users
    async all(): Promise<User[]>{
        return await this.userRepository.find();
    }

    //creating a user
    async create(data) : Promise<User>{
        return  this.userRepository.save(data).catch((err: any)=>{
            if(err.name =="QueryFailedError")
            {
                throw new BadRequestException('Email already existed. Please use different email address.')
            }
        });
    }
}
