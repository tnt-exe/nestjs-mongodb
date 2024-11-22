import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { AccessTokenResponseDto } from './dto/access-token.response.dto';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    name: string,
    password: string,
  ): Promise<AccessTokenResponseDto> {
    const user = await this.userService.getUserByName(name);
    if (!user || password !== 'monke') {
      //hard coded password for demonstration purposes
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.userName,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: 'refresh',
      expiresIn: 6,
      tokenType: 'Bearer',
    };
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verify(token);
      return true;
    } catch (e) {
      log(e);
      return false;
    }
  }
}
