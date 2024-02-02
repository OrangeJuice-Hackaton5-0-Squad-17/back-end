import { User } from "@app/entities/user/user";
import { Email } from "@app/entities/user/validations/user.email.validation";
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
    static toPrisma(user: User) {
       return {
            id: user.id,
            name: user.name,
            email: user.email.value,
            password: user.password,
            updated_at: user.updated_at
        };
    }

    static toDomain(raw: RawUser) {
        return new User({
            email: new Email(raw.email),
            name: raw.name,
            password: raw.password,
            created_at: raw.created_at,
            updated_at: raw.updated_at,
            deleted_at: raw.deleted_at
        }, raw.id);
    }
}