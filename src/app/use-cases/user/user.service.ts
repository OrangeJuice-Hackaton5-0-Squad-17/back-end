import { Injectable } from "@nestjs/common";
import { CreateUser, CreateUserRequest, CreateUserResponse } from "./create-user";
import { DeleteUserById, DeleteUserRequest } from "./delete-user";
import { GetUserByEmail, GetUserByEmailRequest, GetUserByEmailResponse } from "./get-user-by-email";
import { GetUserById, GetUserByIdRequest, GetUserByIdResponse } from "./get-user-by-id";
import { UpdateUser, UpdateUserRequest } from "./update-user";

@Injectable()
export class UserService {
    constructor(
        private createUser: CreateUser,
        private deleteUserById: DeleteUserById,
        private getUserByEmail: GetUserByEmail,
        private getUserById: GetUserById,
        private updateUser: UpdateUser
    ) {}

    async create(request: CreateUserRequest): Promise<CreateUserResponse> {
        return await this.createUser.execute(request);
    }

    async update(request: UpdateUserRequest): Promise<void> {
        return await this.updateUser.execute(request);
    }
    async deleteById(request: DeleteUserRequest): Promise<void> {
        return await this.deleteUserById.execute(request);
    }
    async getByEmail(request: GetUserByEmailRequest): Promise<GetUserByEmailResponse> {
        return await this.getUserByEmail.execute(request);
    }

    async getById(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
        return await this.getUserById.execute(request);
    }
}