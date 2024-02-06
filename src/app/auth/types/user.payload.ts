import { Email } from "@app/entities/user/validations/user.email.validation";

export interface UserPayload {
    sub: string;
    email: Email;
    name: string;
    iat?: number;
    exp?: number;
}