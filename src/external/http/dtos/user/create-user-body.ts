import { IsNotEmpty, IsString, Length } from "class-validator";
import { IsEmail } from "@helpers/emailValidator";

export class CreateUserBody {
    @IsNotEmpty()
    @Length(4, 100)
    @IsString()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @Length(8, 40)
    @IsString()
    password: string;
}