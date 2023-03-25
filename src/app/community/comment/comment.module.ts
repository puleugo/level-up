import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardModule } from '@app/community/board/board.module';
import { BoardService } from '@app/community/board/board.service';
import { CommentController } from '@app/community/comment/comment.controller';
import { CommentService } from '@app/community/comment/comment.service';
import { PostModule } from '@app/community/post/post.module';
import { PostService } from '@app/community/post/post.service';
import { UserModule } from '@app/user/user.module';
import { UserService } from '@app/user/user.service';
import { Board } from '@domain/post/board.entity';
import { PostComment } from '@domain/post/post-comment.entity';
import { PostImage } from '@domain/post/post-image.entity';
import { Post } from '@domain/post/post.entity';

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