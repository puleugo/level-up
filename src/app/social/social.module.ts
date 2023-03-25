import { Module } from '@nestjs/common';

import { SocialGroupBoardModule } from '@app/social/social-board/social-group-board.module';
import { SocialCommentModule } from '@app/social/social-comment/social-comment.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule, SocialGroupBoardModule, SocialCommentModule],
})
export class SocialModule {}
