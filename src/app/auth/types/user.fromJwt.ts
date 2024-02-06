import { Email } from "@app/entities/user/validations/user.email.validation";

export interface UserFromJwt {
    id: string;
    email: Email;
    name: string;
}