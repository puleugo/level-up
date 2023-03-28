import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere, Repository } from 'typeorm';

import { BoardService } from '@app/community/board/board.service';
import {
  MemoirCreateRequestCommand,
  MemoirProfileResponseCommand,
} from '@app/community/post/commands/memoir.command';
import {
  PostCreateRequestCommand,
  PostLikeRequestCommand,
  PostListQuery,
  PostProfileResponseCommand,
  PostUpdateRequestCommand,
} from '@app/community/post/commands/post.command';
import { PostPreviewResponse } from '@app/community/post/dto/post-preview.response';
import { UserService } from '@app/user/user.service';
import { Board } from '@domain/community/board/board.entity';
import { Memoir } from '@domain/community/post/memoir.entity';
import { PostLike } from '@domain/community/post/post-like.entity';
import { Post } from '@domain/community/post/post.entity';
import { User } from '@domain/user/user.entity';
import { Pagination } from '@infrastructure/types/pagination.types';

@Injectable()
export class PostService {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,
    @InjectRepository(Memoir)
    private readonly memoirRepository: Repository<Memoir>,
  ) {}

  async getPosts(
    data: PostListQuery,
  ): Promise<Pagination<PostPreviewResponse>> {
    const { items, meta } = await paginate(
      this.postRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        where: {
          board: { id: data.boardId },
        },
        relations: ['author', 'board'],
        order: { createdAt: 'DESC' },
      },
    );

    return {
      items: items.map((item) => new PostPreviewResponse({ ...item })),
      meta,
    };
  }

  async getPostProfile(postId: number): Promise<PostProfileResponseCommand> {
    return await this.findById(postId);
  }

  async createPost(data: {
    boardId: number;
    author: User;
    postCreateRequest: PostCreateRequestCommand;
  }): Promise<PostProfileResponseCommand> {
    const { id: boardId } = await this.boardService.findById(data.boardId);
    const { id: authorId } = await this.userService.findById(data.author.id);
    return await this.postRepository.save({
      ...data.postCreateRequest,
      board: { id: boardId },
      author: { id: authorId },
    });
  }

  async updatePost(data: {
    postId: number;
    author: User;
    postUpdateRequest: PostUpdateRequestCommand;
  }): Promise<PostProfileResponseCommand> {
    const author = await this.userService.findById(data.author.id);
    const post = await this.findById(data.postId, {
      author: { id: author.id },
    });

    return await this.postRepository.save({
      ...post,
      ...data.postUpdateRequest,
    });
  }

  async deletePost(data: { postId: number; author: User }): Promise<void> {
    await this.postRepository.softDelete({
      id: data.postId,
      author: { id: data.author.id },
    });
    return;
  }

  async findById(
    postId: number,
    where?: FindOptionsWhere<Post>,
  ): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id: postId, ...where },
      relations: ['author', 'board'],
    });
  }

  async hitLike(postLikeRequest: PostLikeRequestCommand): Promise<void> {
    const { id: postId } = await this.findById(postLikeRequest.postId);
    const { id: userId } = await this.userService.findById(
      postLikeRequest.userId,
    );
    const postLike = await this.postLikeRepository.findOne({
      where: { postId, userId },
    });
    if (!postLike) {
      await Promise.all([
        this.postRepository.increment({ id: postId }, 'likeCount', 1),
        this.postLikeRepository.save({ postId, userId }),
      ]);
      return;
    }

    await Promise.all([
      this.postRepository.decrement({ id: postId }, 'likeCount', 1),
      this.postLikeRepository.delete({ postId, userId }),
    ]);
    return;
  }

  async postMemoir(param: {
    memoirCreateRequest: MemoirCreateRequestCommand;
    author: User;
  }): Promise<MemoirProfileResponseCommand> {
    const memoir = await this.memoirRepository.save({
      ...param.memoirCreateRequest,
      user: param.author,
    });
    return memoir;
  }
}
