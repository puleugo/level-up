import { Module } from '@nestjs/common';

import { SocialCommentController } from './social-comment.controller';
import { SocialCommentService } from './social-comment.service';

@Module({
  providers: [SocialCommentService],
  controllers: [SocialCommentController],
  exports: [SocialCommentService],
})
export class SocialCommentModule {}
