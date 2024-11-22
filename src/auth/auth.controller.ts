import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { JwtGuard } from 'src/config/jwt.guard';
import { ApiKeyGuard } from 'src/config/api-key.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign in' })
  async signIn(@Body() { name, password }: SignInDto) {
    return this.authService.signIn(name, password);
  }

  @Get(':token')
  @ApiOperation({ summary: 'Validate token' })
  async validateToken(@Param('token') token: string) {
    return this.authService.validateToken(token);
  }

  @Get('test-token/test')
  @UseGuards(JwtGuard)
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Test token' })
  async testToken() {
    return 'Token is valid';
  }

  @Get('test-key/test')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api_key')
  @ApiOperation({ summary: 'Test key' })
  async testKey() {
    return 'Key is valid';
  }
}
