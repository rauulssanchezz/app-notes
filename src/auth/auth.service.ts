import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(user: User) {
        return await this.userService.validateUser(user);
    }

    login(user: User) {
        const payload = { username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async register(user: User) {
        return await this.userService.create(user);
    }
}
