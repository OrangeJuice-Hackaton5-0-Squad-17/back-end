import { IsEmail, IsString } from "class-validator";

export class LoginValidationRequestBody {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}