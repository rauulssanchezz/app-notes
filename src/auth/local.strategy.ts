import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { User } from "src/user/user.entity";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(user: User): Promise<any> {
        const newUser = await this.authService.validateUser(user);
        if (!newUser) {
          throw new UnauthorizedException('Invalid credentials');
        }
        return newUser;
      }
}