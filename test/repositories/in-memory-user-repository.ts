import { User } from "src/app/entities/user/user";
import { UserRepository } from "src/app/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
    public users: User[] = [];

    async create(user: User) {
       this.users.push(user);
       console.log('criando usuario...', this.users);
    }
}