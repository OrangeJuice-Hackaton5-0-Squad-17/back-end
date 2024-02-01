import { User } from "@app/entities/user/user";
import { Email } from "@app/entities/user/validations/user.email.validation";
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
    static toPrisma(user: User) {
       return {
            id: user.id,
            name: user.name,
            email: user.email.value,
            password: user.password
        };
    }

    static toDomain(raw: RawUser) {
        return new User({
            email: new Email(raw.email),
            name: raw.name,
            password: raw.password,
            created_at: raw.created_at
        }, raw.id);
    }
}