import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';

import { BoardService } from '@app/community/board/board.service';
import {
  PostCommentCreateRequestCommand,
  PostCommentProfileResponseCommand,
  PostCommentUpdateRequestCommand,
} from '@app/community/comment/commands';
import { PostService } from '@app/community/post/post.service';
import { UserService } from '@app/user/user.service';
import { Board } from '@domain/community/board/board.entity';
import { PostComment } from '@domain/community/comment/post-comment.entity';
import { Post } from '@domain/community/post/post.entity';
import { CommentNotFoundException } from '@domain/errors/community/comment/comment.errors';
import { PostNotFoundException } from '@domain/errors/community/post/post.errors';
import {
  UserAccessDeniedException,
  UserNotFoundException,
} from '@domain/errors/user.errors';
import { User } from '@domain/user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly boardService: BoardService,
    private readonly postService: PostService,
    private readonly userService: UserService,
    @InjectRepository(PostComment)
    private readonly postCommentRepository: Repository<PostComment>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getComments(data: {
    postId: number;
  }): Promise<PostCommentProfileResponseCommand[]> {
    const postCnt = await this.postRepository.count({
      where: { id: data.postId },
    });
    if (postCnt < 1) throw new PostNotFoundException();

    return await this.findCommentsByPostId(data.postId, {
      author: true,
    });
  }

  async createComment(data: {
    author: User;
    postCommentCreateRequest: PostCommentCreateRequestCommand;
    postId: number;
  }): Promise<PostCommentProfileResponseCommand> {
    const author = await this.userService.findById(data.author.id);
    if (!author) throw new UserAccessDeniedException();
    const post = await this.postService.findById(data.postId);
    if (!post) throw new PostNotFoundException();

    return await this.postCommentRepository.save({
      author,
      post,
      ...data.postCommentCreateRequest,
    });
  }

  async createReply(data: {
    author: User;
    postCommentCreateRequest: PostCommentCreateRequestCommand;
    postCommentId: number;
  }): Promise<PostCommentProfileResponseCommand> {
    const author = await this.userService.findById(data.author.id);
    if (!author) throw new UserNotFoundException();
    const comment = await this.findById(data.postCommentId, { post: true });
    if (!comment) throw new CommentNotFoundException();
    return await this.postCommentRepository.save({
      ...data.postCommentCreateRequest,
      author,
      parentComment: { id: comment.id },
      post: comment.post,
    });
  }

  async updateComment(data: {
    author: User;
    postCommentUpdateRequest: PostCommentUpdateRequestCommand;
    postCommentId: number;
  }): Promise<PostCommentProfileResponseCommand> {
    const author = await this.userService.findById(data.author.id);
    if (!author) throw new UserNotFoundException();
    const comment = await this.findById(data.postCommentId);
    if (!comment) throw new CommentNotFoundException();
    if (comment.authorId !== author.id) throw new UserAccessDeniedException();
    return await this.postCommentRepository.save({
      ...comment,
      ...data.postCommentUpdateRequest,
    });
  }

  async deleteComment(data: {
    author: User;
    postCommentId: number;
  }): Promise<void> {
    const author = await this.userService.findById(data.author.id);
    if (!author) throw new UserNotFoundException();
    const comment = await this.findById(data.postCommentId);
    if (!comment) throw new CommentNotFoundException();
    if (comment.authorId !== author.id) throw new UserAccessDeniedException();

    await this.postCommentRepository.softDelete({ id: comment.id });
    return;
  }

  async findCommentsByPostId(
    postId: number,
    relations?: FindOptionsRelations<PostComment>,
  ): Promise<PostComment[]> {
    return await this.postCommentRepository.find({
      where: { post: { id: postId } },
      relations,
      order: { createdAt: 'ASC' },
    });
  }

  async findById(
    postCommentId: number,
    relations?: FindOptionsRelations<PostComment>,
  ): Promise<PostComment> {
    return await this.postCommentRepository.findOne({
      where: { id: postCommentId },
      relations,
    });
  }
}
