import { GetUserByEmail } from "@app/use-cases/user/get-user-by-email";
import { Injectable } from "@nestjs/common";
import { EmailOrPasswordIncorrect } from "./errors/email-password-incorrect-error";
import * as bcrypt from 'bcrypt';
import { UserNotFound } from "@app/use-cases/errors/user-not-found-error";
import { UserService } from "@app/use-cases/user/user.service";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private getuserByEmail: GetUserByEmail) {}
    async validateUser(email: string, password: string) {
       
       try {
        const { user } = await this.userService.getByEmail({email});

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new EmailOrPasswordIncorrect;
        }
        return {
            ...user,
            password: undefined
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