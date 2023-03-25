import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { PostService } from './post.service';

import { BoardModule } from '@app/community/board/board.module';
import { UserModule } from '@app/user/user.module';
import { Board } from '@domain/post/board.entity';
import { Memoir } from '@domain/post/memoir.entity';
import { PostComment } from '@domain/post/post-comment.entity';
import { PostImage } from '@domain/post/post-image.entity';
import { Post } from '@domain/post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Post, PostImage, PostComment, Memoir]),
    UserModule,
    BoardModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
