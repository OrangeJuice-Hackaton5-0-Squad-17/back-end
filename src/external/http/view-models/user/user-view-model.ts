import { User } from "@app/entities/user/user";

export class UserViewModel {
    static toHTTP (user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email.value,
            created_at: user.created_at,
            updated_at: user.updated_at,
            deleted_at: user.deleted_at
        }
    }
}