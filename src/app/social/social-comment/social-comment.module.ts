import { Module } from '@nestjs/common';

import { SocialCommentController } from '@app/social/social-comment/social-comment.controller';
import { SocialCommentService } from '@app/social/social-comment/social-comment.service';

@Module({
  controllers: [SocialCommentController],
  providers: [SocialCommentService],
  exports: [SocialCommentService],
})
export class SocialCommentModule {}
