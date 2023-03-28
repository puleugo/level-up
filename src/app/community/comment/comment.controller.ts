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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { CommentService } from '@app/community/comment/comment.service';
import { PostCommentCreateRequest } from '@app/community/comment/dto/post-comment-create.request';
import { PostCommentProfileResponse } from '@app/community/comment/dto/post-comment-profile.response';
import { PostCommentUpdateRequest } from '@app/community/comment/dto/post-comment-update.request';
import { COMMENT_ERRORS } from '@domain/errors/community/comment/comment.errors';
import { POST_ERRORS } from '@domain/errors/community/post/post.errors';
import { USER_ERRORS } from '@domain/errors/user.errors';
import { User } from '@domain/user/user.entity';

@ApiTags('[커뮤니티] 댓글')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('posts/:postId/comments')
  @ApiOperation({ summary: '댓글 목록 조회' })
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
  @ApiOperation({ summary: '일반 댓글 작성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({
    description: [POST_ERRORS.POST_NOT_FOUND, USER_ERRORS.USER_NOT_FOUND].join(
      ',',
    ),
  })
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
  @ApiOperation({ summary: '대댓글 작성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({
    description: [
      USER_ERRORS.USER_NOT_FOUND,
      COMMENT_ERRORS.COMMENT_NOT_FOUND,
    ].join(','),
  })
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
  @ApiOperation({ summary: '댓글 수정' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({
    description: [
      USER_ERRORS.USER_NOT_FOUND,
      COMMENT_ERRORS.COMMENT_NOT_FOUND,
    ].join(','),
  })
  @ApiBadRequestResponse({
    description: USER_ERRORS.USER_ACCESS_DENIED,
  })
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
  @ApiOperation({ summary: '댓글 삭제' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({
    description: [
      USER_ERRORS.USER_NOT_FOUND,
      COMMENT_ERRORS.COMMENT_NOT_FOUND,
    ].join(','),
  })
  @ApiBadRequestResponse({
    description: USER_ERRORS.USER_ACCESS_DENIED,
  })
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
