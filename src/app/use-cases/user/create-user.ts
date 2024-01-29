import { UserRepository } from "./../../repositories/user-repository";
import { User } from "../../entities/user/user";
import { Email } from "../../entities/user/validations/user.email.validation";
import { Injectable } from "@nestjs/common";

interface CreateUserRequest {
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

        const user = new User({
            name,
            email: new Email(email),
            password
        });

        await this.userRepository.create(user);

        return {
            user,
        }
    }
}