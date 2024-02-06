import { UserRepository } from "@app/repositories/user/user-repository";
import { User } from "@app/entities/user/user";
import { Email } from "@app/entities/user/validations/user.email.validation";
import { Injectable } from "@nestjs/common";
import { UserNotFound } from "../errors/user-not-found-error";

export interface UpdateUserRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
}

@Injectable()
export class UpdateUser {
    constructor(private userRepository: UserRepository){}
    async execute(request: UpdateUserRequest): Promise<void> {
        const { name, email, password, id } = request;

        const userFound = await this.userRepository.findById(id);

        if (!userFound) {
            throw new UserNotFound();
        } else {
            const user = new User({
                name: name ?? userFound.name,
                email: email ? new Email(email) : userFound.email,
                password: password ?? userFound.password,
                created_at: userFound.created_at,
                updated_at: new Date()
            }, id);
    
            await this.userRepository.update(user);
        }       
    }
}