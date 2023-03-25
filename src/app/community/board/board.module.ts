import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardController } from './board.controller';
import { BoardService } from './board.service';

import { Board } from '@domain/post/board.entity';
import { PostComment } from '@domain/post/post-comment.entity';
import { PostImage } from '@domain/post/post-image.entity';
import { Post } from '@domain/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Post, PostImage, PostComment])],
  providers: [BoardService],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule {}
