import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserSettingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  receiveNotification?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  receiveEmail?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  receiveSMS?: boolean;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'The user name',
    example: 'monke',
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiPropertyOptional({
    description: 'The user display name',
    example: 'Black Monke',
  })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserSettingsDto)
  setting?: CreateUserSettingsDto;
}
