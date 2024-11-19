import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import mongoose from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('invalid post id');
    return await this.postService.findPostById(id);
  }
}
