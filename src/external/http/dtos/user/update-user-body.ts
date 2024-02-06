import { IsOptional, IsString, Length } from "class-validator";
import { IsEmail } from "@helpers/emailValidator";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateUserBody {
    @ApiProperty({ example: 'Marcos Mantovani', description: 'IsOptional(not required)' })
    @IsOptional()
    @Length(4, 100)
    @IsString()
    name?: string;
    @ApiProperty({ example: 'teste@teste.com', description: 'IsOptional(not required)' })
    @IsOptional()
    @Length(4, 100)
    @IsEmail()
    email?: string;
    @ApiProperty({ example: 'pass@sword123*', description: 'IsOptional(not required), Min length: 8, Max length: 20' })
    @IsOptional()
    @Length(8, 20)
    @IsString()
    password?: string;
}