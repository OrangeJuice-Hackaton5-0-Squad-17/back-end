import { Module } from "@nestjs/common";
import { DatabaseModule } from "@external/database/database.module";
import { AuthController } from "@external/http/controllers/auth/auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserModule } from "@app/use-cases/user/user.module";
@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService, LocalStrategy]
})
export class AuthModule {}
