import { User } from "@app/entities/user/user";
import { UserRepository } from "@app/repositories/user/user-repository";
import { Injectable } from "@nestjs/common";
import { UserNotFound } from "../errors/user-not-found-error";

export interface GetUserByEmailRequest {
    email: string;
};

export interface GetUserByEmailResponse {
    user: User;
}
@Injectable()
export class GetUserByEmail {
    constructor(private userRepository: UserRepository) {}

    async execute(request: GetUserByEmailRequest): Promise<GetUserByEmailResponse> {
        const { email } = request;

        const userFound = await this.userRepository.findByEmail(email);

        if (!userFound) {
            throw new UserNotFound();
        } else {
    
            return {
                user: userFound
            };
        }  
        
    }
}