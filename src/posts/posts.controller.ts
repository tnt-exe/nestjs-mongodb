import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import mongoose from 'mongoose';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
} from '@nestjs/swagger';

@Controller('posts')
@ApiConsumes('application/json')
@ApiProduces('application/json')
@ApiBearerAuth()
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'create new post' })
  @ApiCreatedResponse({
    description: 'post created',
    type: CreatePostDto,
  })
  @ApiBadRequestResponse({
    description: 'invalid post id',
    type: BadRequestException,
  })
  @ApiNotFoundResponse({
    description: 'userid not found',
    type: NotFoundException,
  })
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get post by id' })
  @ApiOkResponse({
    description: 'post found',
    type: CreatePostDto,
  })
  @ApiNotFoundResponse({
    description: 'post not found',
    type: NotFoundException,
  })
  async getPostById(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('invalid post id');
    return await this.postService.findPostById(id);
  }
}
