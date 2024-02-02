import { User } from "@app/entities/user/user";
import { UserRepository } from "@app/repositories/user/user-repository";
import { UserNotFound } from "../errors/user-not-found-error";
import { Injectable } from "@nestjs/common";
import { UserAlreadyDeleted } from "../errors/user-already-deleted-error";

export interface DeleteUserRequest {
    id: string;
}

export interface DeleteUserResponse {
    user: User
}
@Injectable()
export class DeleteUserById {
    constructor(private userRepository: UserRepository) {}

    async execute(request: DeleteUserRequest): Promise<void> {
        const { id } = request;

        const userFound = await this.userRepository.findById(id);

        if (!userFound) {
            throw new UserNotFound();
        } else if (userFound.deleted_at != null) {
            throw new UserAlreadyDeleted();
        }

        await this.userRepository.delete(id);
    }
}