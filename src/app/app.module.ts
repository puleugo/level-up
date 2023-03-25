import { Module } from '@nestjs/common';

import { CommunityModule } from './community/community.module';

import { AppController } from '@app/app.controller';
import { AuthModule } from '@app/auth/auth.module';
import { ChannelModule } from '@app/channel/channel.module';
import { SocialModule } from '@app/social/social.module';
import { UserModule } from '@app/user/user.module';
import { WishBucketModule } from '@app/wish-bucket/wish-bucket.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    AuthModule,
    CommunityModule,
    SocialModule,
    UserModule,
    WishBucketModule,
    ChannelModule,
    TodoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
