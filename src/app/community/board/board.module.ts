import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardController } from './board.controller';
import { BoardService } from './board.service';

import { Board } from '@domain/community/board/board.entity';
import { PostComment } from '@domain/community/comment/post-comment.entity';
import { PostImage } from '@domain/community/post/post-image.entity';
import { Post } from '@domain/community/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Post, PostImage, PostComment])],
  providers: [BoardService],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule {}
