import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
import { UserAccessDeniedException } from '@domain/errors/user.errors';
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
  ) {}

  async getComments(data: {
    postId: string;
  }): Promise<PostCommentProfileResponseCommand[]> {
    return await this.findCommentsByPostId(data.postId);
  }

  async createComment(data: {
    author: User;
    postCommentCreateRequest: PostCommentCreateRequestCommand;
    postId: string;
  }): Promise<PostCommentProfileResponseCommand> {
    const author = await this.userService.findById(data.author.id);

    return await this.postCommentRepository.save({
      author,
      ...data.postCommentCreateRequest,
    });
  }

  async createReply(data: {
    author: User;
    postCommentCreateRequest: PostCommentCreateRequestCommand;
    postCommentId: string;
  }): Promise<PostCommentProfileResponseCommand> {
    const author = await this.userService.findById(data.author.id);
    const comment = await this.findById(data.postCommentId);
    return await this.postCommentRepository.save({
      author,
      ...data.postCommentCreateRequest,
      parent: comment,
    });
  }

  async updateComment(data: {
    author: User;
    postCommentUpdateRequest: PostCommentUpdateRequestCommand;
    postCommentId: string;
  }): Promise<PostCommentProfileResponseCommand> {
    const author = await this.userService.findById(data.author.id);
    const comment = await this.findById(data.postCommentId);
    if (comment.author.id !== author.id) throw new UserAccessDeniedException();
    return await this.postCommentRepository.save({
      ...comment,
      ...data.postCommentUpdateRequest,
    });
  }

  async deleteComment(data: {
    author: User;
    postCommentId: string;
  }): Promise<void> {
    const author = await this.userService.findById(data.author.id);
    const comment = await this.findById(data.postCommentId);
    if (comment.author.id !== author.id) throw new UserAccessDeniedException();

    await this.postCommentRepository.softDelete({ id: comment.id });
    return;
  }

  async findCommentsByPostId(postId: string): Promise<PostComment[]> {
    return await this.postCommentRepository.find({
      where: { post: { id: postId } },
    });
  }

  async findById(postCommentId: string): Promise<PostComment> {
    return await this.postCommentRepository.findOne({
      where: { id: postCommentId },
    });
  }
}
