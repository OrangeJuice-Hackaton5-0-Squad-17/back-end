import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(conext: ExecutionContext) {
        return super.canActivate(conext);
    }

    handleRequest(err, user) {
        if (err || !user) {
            throw new UnauthorizedException(err?.message);
        }
        return user;
    }
}