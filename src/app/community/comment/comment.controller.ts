import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { CommentService } from '@app/community/comment/comment.service';
import { PostCommentCreateRequest } from '@app/community/comment/dto/post-comment-create.request';
import { PostCommentProfileResponse } from '@app/community/comment/dto/post-comment-profile.response';
import { PostCommentUpdateRequest } from '@app/community/comment/dto/post-comment-update.request';
import { User } from '@domain/user/user.entity';

@ApiTags('[커뮤니티] 댓글')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('posts/:postId/comments')
  async getComments(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<PostCommentProfileResponse[]> {
    const postComments = await this.commentService.getComments({
      postId,
    });
    return postComments.map(
      (comment) => new PostCommentProfileResponse(comment),
    );
  }

  @Post('posts/:postId/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createComment(
    @Req() author: User,
    @Body() postCommentCreateRequest: PostCommentCreateRequest,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<PostCommentProfileResponse> {
    const createdPostComment = await this.commentService.createComment({
      author,
      postCommentCreateRequest,
      postId,
    });
    return new PostCommentProfileResponse(createdPostComment);
  }

  @Post('comments/:postCommentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createReply(
    @Req() author: User,
    @Body() postCommentCreateRequest: PostCommentCreateRequest,
    @Param('postCommentId', ParseIntPipe) postCommentId: number,
  ): Promise<PostCommentProfileResponse> {
    const postComment = await this.commentService.createReply({
      author,
      postCommentCreateRequest,
      postCommentId,
    });
    return new PostCommentProfileResponse(postComment);
  }

  @Patch('comments/:postCommentId')
  async updateComment(
    @Req() author: User,
    @Body() postCommentUpdateRequest: PostCommentUpdateRequest,
    @Param('postCommentId', ParseIntPipe) postCommentId: number,
  ): Promise<PostCommentProfileResponse> {
    const postComment = await this.commentService.updateComment({
      author,
      postCommentUpdateRequest,
      postCommentId,
    });
    return new PostCommentProfileResponse(postComment);
  }

  @Delete('comments/:postCommentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteComment(
    @Req() author: User,
    @Param('postCommentId', ParseIntPipe) postCommentId: number,
  ) {
    return await this.commentService.deleteComment({
      author,
      postCommentId,
    });
  }
}
