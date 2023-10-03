import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class FriendsGuard implements CanActivate{
    constructor(private readonly authService: AuthService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if (context.getType() !== 'http') return true;

        const request = context.switchToHttp().getRequest();
    }
}