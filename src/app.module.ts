import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB),
    UserModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
