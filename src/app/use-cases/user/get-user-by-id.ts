import { User } from "@app/entities/user/user";
import { UserRepository } from "@app/repositories/user/user-repository";
import { Injectable } from "@nestjs/common";
import { UserNotFound } from "../errors/user-not-found-error";

export interface GetUserByIdRequest {
    id: string;
};

export interface GetUserByIdResponse {
    user: User;
}
@Injectable()
export class GetUserById {
    constructor(private userRepository: UserRepository) {}

    async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
        const { id } = request;

        const userFound = await this.userRepository.findById(id);

        if (!userFound) {
            throw new UserNotFound();
        } else {
    
            return {
                user: userFound
            };
        }  
        
    }
}