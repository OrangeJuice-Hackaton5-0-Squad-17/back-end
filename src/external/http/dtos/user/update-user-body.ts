import { IsOptional, Length } from "class-validator";
import { IsEmail } from "@helpers/emailValidator";


export class UpdateUserBody {
    @IsOptional()
    @Length(4, 100)
    name: string;
    @IsOptional()
    @Length(4, 100)
    @IsEmail()
    email: string;
    @IsOptional()
    @Length(8, 40)
    password: string;
}