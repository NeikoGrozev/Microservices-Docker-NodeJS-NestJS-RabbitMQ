import { Request } from 'express';
import {
    CanActivate,
    ExecutionContext,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { getSessionResponse } from 'src/helpers/authHelper';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization || '';
        const response = await getSessionResponse(authHeader);

        if (response.status !== HttpStatus.OK) {
            throw new UnauthorizedException(
                'No session token received from login.',
            );
        }

        const session = await response.json();
        request.identity = session;

        return true;
    }
}
