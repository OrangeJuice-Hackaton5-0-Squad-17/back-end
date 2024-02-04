import { IsNotEmpty, IsString, Length } from "class-validator";
import { IsEmail } from "@helpers/emailValidator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserBody {
    @ApiProperty({ example: 'Marcos Mantovani' })
    @IsNotEmpty()
    @Length(4, 100)
    @IsString()
    name: string;
    @ApiProperty({ example: 'teste@teste.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty({ example: 'pass@sword123*', description: 'Min length: 8, Max length: 20' })
    @IsNotEmpty()
    @Length(8, 20)
    @IsString()
    password: string;
}