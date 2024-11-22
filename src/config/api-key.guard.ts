import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const apiKey = request.headers['api_key'];

    if (!apiKey) {
      throw new UnauthorizedException();
    }

    const isValid = apiKey === 'monke';

    return isValid;
  }
}
