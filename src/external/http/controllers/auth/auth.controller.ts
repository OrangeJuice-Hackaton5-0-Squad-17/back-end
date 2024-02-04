import { Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../../../../app/auth/guards/local-auth.guard";
import { AuthService } from "../../../../app/auth/auth.service";

@Controller()
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login() {
        return 'Login realizado com sucesso!'
    }
}