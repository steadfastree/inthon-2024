import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/common/enums/user-role.enum';

@Injectable()
export class ArtistGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const { user } = context.switchToHttp().getRequest();
        if (!user) {
            console.log('User object is undefined.');
            return false;
        }
        return user.role === UserRole.ARTIST;
    }
}
