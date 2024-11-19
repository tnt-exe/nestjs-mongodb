import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'The user display name',
    example: 'Black Monke',
  })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiPropertyOptional({
    description: 'The user avatar URL',
    example: 'https://monke.com/monke.jpg',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
