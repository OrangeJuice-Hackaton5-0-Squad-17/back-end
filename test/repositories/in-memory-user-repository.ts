import { User } from "src/app/entities/user/user";
import { UserRepository } from "src/app/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
    public users: User[] = [];
    async update(user: User): Promise<void> {
        const userIndex = this.users.findIndex( item => item.id === user.id);
        if (userIndex >= 0) {
             this.users[userIndex] = user;
        }
    }
    async findByEmail(email: string): Promise<User | null> {
        const foundUser = this.users.find((item) => item.email.value === email);
        if (!foundUser) {
            return null
        }
        return foundUser
    }

    async create(user: User) {
       this.users.push(user);
       console.log('criando usuario...', this.users);
    }
}