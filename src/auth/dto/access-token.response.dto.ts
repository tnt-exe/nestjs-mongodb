import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponseDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  tokenType: string;
  @ApiProperty()
  expiresIn: number;
}
