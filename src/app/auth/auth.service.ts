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

     login(user: any): UserToken {
        const payload: UserPayload = {
            sub: user._id,
            name: user.props.name,
            email: user.props.email
        }
        console.log('tes', payload)
        const generatedUserToken = this.jwtService.sign(payload, {secret: process.env.JWT_USER_SECRET})
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