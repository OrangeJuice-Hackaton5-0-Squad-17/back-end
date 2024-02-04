import { Injectable } from "@nestjs/common";
import { EmailOrPasswordIncorrect } from "./errors/email-password-incorrect-error";
import * as bcrypt from 'bcrypt';
import { UserNotFound } from "@app/use-cases/errors/user-not-found-error";
import { UserService } from "@app/use-cases/user/user.service";
import { User } from "@app/entities/user/user";
import { UserPayload } from "./types/user.payload";
import { JwtService } from "@nestjs/jwt";
import { UserToken } from "./types/user.token";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

     login(user: User): UserToken {
        const payload: UserPayload = {
            sub: user.id,
            name: user.name,
            email: user.email
        }
        const generatedUserToken = this.jwtService.sign(payload)
        return {
            access_token: generatedUserToken
        }
    }
    async validateUser(email: string, password: string) {
       
       try {
        const { user } = await this.userService.getByEmail({email});

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new EmailOrPasswordIncorrect;
        }
        return {
            ...user
        }
       } catch (err) {
        if (err instanceof UserNotFound) {
            throw new EmailOrPasswordIncorrect;
          } else {
            throw err;
          }
       }
    }
}