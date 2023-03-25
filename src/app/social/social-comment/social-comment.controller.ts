import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

import { SocialCommentService } from '@app/social/social-comment/social-comment.service';

@Controller()
@ApiExcludeController()
@ApiTags('[커뮤니티] 소셜링 댓글')
export class SocialCommentController {
  constructor(private readonly socialCommentService: SocialCommentService) {}

  @Get('social-group-posts/:socialGroupPostId/social-group-comments')
  async getComments(
    @Param('socialGroupBoardId', ParseUUIDPipe) socialGroupBoardId: string,
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
  ) {
    return this.socialCommentService.getComments({
      socialGroupPostId,
    });
  }

  @Post('social-group-posts/:socialGroupPostId/social-group-comments')
  async createComment(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
  ) {
    return this.socialCommentService.createComment({
      socialGroupPostId,
    });
  }

  @Post(
    'social-group-posts/:socialGroupPostId/social-group-comments/:socialGroupCommentId',
  )
  async createReply(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Param('socialGroupCommentId', ParseUUIDPipe) socialGroupCommentId: string,
  ) {
    return await this.socialCommentService.createReply({
      socialGroupPostId,
      socialGroupCommentId,
    });
  }

  @Post(
    'social-group-posts/:socialGroupPostId/social-group-comments/:socialGroupCommentId',
  )
  async hitLike(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Param('socialGroupCommentId', ParseUUIDPipe) socialGroupCommentId: string,
  ) {
    return await this.socialCommentService.hitLike({
      socialGroupPostId,
      socialGroupCommentId,
    });
  }

  @Patch(
    'social-group-posts/:socialGroupPostId/social-group-comments/:socialGroupCommentId',
  )
  async updateComment(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Param('socialGroupCommentId', ParseUUIDPipe) socialGroupCommentId: string,
  ) {
    return await this.socialCommentService.updateComment({
      socialGroupPostId,
      socialGroupCommentId,
    });
  }

  @Delete(
    'social-group-posts/:socialGroupPostId/social-group-comments/:socialGroupCommentId',
  )
  async deleteComment(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Param('socialGroupCommentId', ParseUUIDPipe) socialGroupCommentId: string,
  ) {
    return await this.socialCommentService.deleteComment({
      socialGroupPostId,
      socialGroupCommentId,
    });
  }
}
