import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'title of post',
    example: 'this is a title of monke',
    maxLength: 200,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: 'contents of post',
    example: 'this is a contents of monke',
    maxLength: 200,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  contents: string;

  @ApiProperty({
    description: 'user id',
    example: '60f7b3b3b3b3b3b3b3b3b3b3',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
