import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/common/enums/user-role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const { user } = context.switchToHttp().getRequest();
        return user.role === UserRole.ADMIN;
    }
}
