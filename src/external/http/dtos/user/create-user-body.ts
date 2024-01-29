import { IsNotEmpty, Length } from "class-validator";
import { IsEmail } from "src/helpers/emailValidator";

export class CreateUserBody {
    @IsNotEmpty()
    @Length(4, 100)
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @Length(8, 40)
    password: string;
}