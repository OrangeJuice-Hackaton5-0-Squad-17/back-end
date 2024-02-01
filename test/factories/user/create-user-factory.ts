import { User, UserProps } from "@app/entities/user/user";
import { Email } from "@app/entities/user/validations/user.email.validation";

type Override = Partial<UserProps>

export function makeUser(override: Override) {
    return new User({
        name: 'Marcos',
        email: new Email('teste@teste.com'),
        password: '12345678',
        ...override,
    });
};