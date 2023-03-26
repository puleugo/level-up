import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { PostService } from './post.service';

import { BoardModule } from '@app/community/board/board.module';
import { UserModule } from '@app/user/user.module';
import { Board } from '@domain/community/board/board.entity';
import { PostComment } from '@domain/community/comment/post-comment.entity';
import { Memoir } from '@domain/community/post/memoir.entity';
import { PostImage } from '@domain/community/post/post-image.entity';
import { Post } from '@domain/community/post/post.entity';

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
