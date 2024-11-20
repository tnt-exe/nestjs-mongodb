import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('userid not found');

    const newPost = new this.postModel(createPostDto);
    const savedPost = await newPost.save();

    const updatedUser = await user.updateOne({
      $push: {
        posts: savedPost._id,
      },
    });

    return savedPost;
  }

  findPostById(id: string): Promise<Post> {
    return this.postModel.findById(id);
  }
}
