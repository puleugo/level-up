import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SocialGroupPostController } from '@app/social/social-post/social-group-post.controller';
import { SocialGroupPostService } from '@app/social/social-post/social-group-post.service';
import { UserModule } from '@app/user/user.module';
import { SocialGroupPlace } from '@domain/social/social-group-place.entity';
import { SocialGroupUser } from '@domain/social/social-group-user.entity';
import { SocialGroupPost } from '@domain/social/social-group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SocialGroupPost,
      SocialGroupUser,
      SocialGroupPlace,
    ]),
    UserModule,
  ],
  controllers: [SocialGroupPostController],
  providers: [SocialGroupPostService],
  exports: [SocialGroupPostService],
})
export class SocialGroupPostModule {}
