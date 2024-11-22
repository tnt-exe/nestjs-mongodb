import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secret2',
      verifyOptions: {
        audience: 'http://localhost:3000',
        issuer: 'http://localhost:3000',
      },
      signOptions: {
        expiresIn: '1h',
        audience: 'http://localhost:3000',
        issuer: 'http://localhost:3000',
      },
    }),
  ],
})
export class AuthModule {}
