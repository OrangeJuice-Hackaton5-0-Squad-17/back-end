import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../../../../app/auth/guards/local-auth.guard";
import { AuthService } from "../../../../app/auth/auth.service";
import { User } from "@app/entities/user/user";
import { Request as ExpressRequest } from "express";
import { IsPublic } from "@app/auth/decorators/is-public.decorator";

interface AuthRequest extends ExpressRequest {
    user: User
}

@Controller()
export class AuthController {
    constructor(private readonly authservice: AuthService) { }
    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest) {
        return this.authservice.login(req.user)
    }
}