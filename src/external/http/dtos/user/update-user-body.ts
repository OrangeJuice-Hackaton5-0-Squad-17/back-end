import { IsOptional, IsString, Length } from "class-validator";
import { IsEmail } from "@helpers/emailValidator";


export class UpdateUserBody {
    @IsOptional()
    @Length(4, 100)
    @IsString()
    name: string;
    @IsOptional()
    @Length(4, 100)
    @IsEmail()
    email: string;
    @IsOptional()
    @Length(8, 40)
    @IsString()
    password: string;
}