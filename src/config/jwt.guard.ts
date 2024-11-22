import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { log } from 'console';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }

    const token = request.headers.authorization.split(' ')[1];

    const isValid = await this.authService.validateToken(token);

    log(isValid);

    return isValid;
  }
}
