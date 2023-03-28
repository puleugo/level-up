import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardModule } from '@app/community/board/board.module';
import { CommentController } from '@app/community/comment/comment.controller';
import { CommentService } from '@app/community/comment/comment.service';
import { PostModule } from '@app/community/post/post.module';
import { UserModule } from '@app/user/user.module';
import { Board } from '@domain/community/board/board.entity';
import { PostComment } from '@domain/community/comment/post-comment.entity';
import { PostImage } from '@domain/community/post/post-image.entity';
import { Post } from '@domain/community/post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Post, PostImage, PostComment]),
    PostModule,
    BoardModule,
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
