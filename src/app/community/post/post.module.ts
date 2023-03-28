import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardModule } from '@app/community/board/board.module';
import { PostController } from '@app/community/post/post.controller';
import { PostService } from '@app/community/post/post.service';
import { UserModule } from '@app/user/user.module';
import { Board } from '@domain/community/board/board.entity';
import { PostComment } from '@domain/community/comment/post-comment.entity';
import { Memoir } from '@domain/community/post/memoir.entity';
import { PostImage } from '@domain/community/post/post-image.entity';
import { PostLike } from '@domain/community/post/post-like.entity';
import { Post } from '@domain/community/post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Board,
      Post,
      PostLike,
      PostImage,
      PostComment,
      Memoir,
    ]),
    UserModule,
    BoardModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
