import { User } from "@app/entities/user/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
    abstract update(user: User): Promise<void>;
    abstract delete(id: string): Promise<void>;
}