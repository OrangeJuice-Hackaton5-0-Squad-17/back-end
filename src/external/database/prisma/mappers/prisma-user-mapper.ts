import { User } from "@app/entities/user/user";

export class PrismaUserMapper {
    static toPrisma(user: User) {
       return {
            id: user.id,
            name: user.name,
            email: user.email.value,
            password: user.password
        }
    }
}