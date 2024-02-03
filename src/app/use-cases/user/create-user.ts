import { UserRepository } from "@app/repositories/user/user-repository";
import { User } from "@app/entities/user/user";
import { Email } from "@app/entities/user/validations/user.email.validation";
import { Injectable } from "@nestjs/common";
import { UserEmailAlreadyInUse } from "../errors/user-email-already-in-use-error";
import * as bcrypt from 'bcrypt';

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

interface CreateUserResponse {
    user: User;
}

@Injectable()
export class CreateUser {
    constructor(private userRepository: UserRepository){}
    async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
        const { name, email, password } = request;

        const userFound = await this.userRepository.findByEmail(email);

        if (userFound) {
            throw new UserEmailAlreadyInUse();
        } else {
            const user = new User({
                name,
                email: new Email(email),
                password: await bcrypt.hash(password, 11)
            });
    
            await this.userRepository.create(user);
    
            return {
                user,
            }
        }       
    }
}