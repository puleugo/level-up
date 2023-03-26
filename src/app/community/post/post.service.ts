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
  PostListQuery,
  PostProfileResponseCommand,
  PostUpdateRequestCommand,
} from '@app/community/post/commands/post.command';
import { PostPreviewResponse } from '@app/community/post/dto/post-preview.response';
import { PostProfileResponse } from '@app/community/post/dto/post-profile.response';
import { Pagination } from '@app/infrastructure/types/pagination.types';
import { UserService } from '@app/user/user.service';
import { Board } from '@domain/community/board/board.entity';
import { Memoir } from '@domain/community/post/memoir.entity';
import { Post } from '@domain/community/post/post.entity';
import { User } from '@domain/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Memoir)
    private readonly memoirRepository: Repository<Memoir>,
  ) {}

  async getPosts(
    data: PostListQuery,
  ): Promise<Pagination<PostProfileResponse>> {
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

  async getPostProfile(postId: string): Promise<PostProfileResponse> {
    return;
  }

  async createPost(data: {
    boardId: string;
    author: User;
    postCreateRequest: PostCreateRequestCommand;
  }): Promise<PostProfileResponseCommand> {
    const board = await this.boardService.findById(data.boardId);
    const author = await this.userService.findById(data.author.id);
    return await this.postRepository.save({
      author,
      board,
      ...data.postCreateRequest,
    });
  }

  async updatePost(data: {
    postId: string;
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

  async deletePost(data: { postId: string; author: User }): Promise<void> {
    await this.postRepository.softDelete({
      id: data.postId,
      author: { id: data.author.id },
    });
    return;
  }

  async findById(
    postId: string,
    where?: FindOptionsWhere<PostProfileResponseCommand>,
  ): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id: postId, ...where },
      relations: ['author', 'board'],
    });
  }

  async hitLike(): Promise<void> {
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
