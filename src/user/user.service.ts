import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(user: User): Promise<String> {
        const hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;
        await this.userRepository.save(user);
        return 'User created successfully';
    }

    async validateUser(user: User) {
        const newUser = await this.userRepository.findOne({where: {username: user.username}});
        if (newUser && (await bcrypt.compare(user.password, newUser.password))) {
            return newUser;
          }else {
            return null;
        }
    }

    async findOne(username: string): Promise<User | null> {
        return this.userRepository.findOne({where: {username}});
    }
}
