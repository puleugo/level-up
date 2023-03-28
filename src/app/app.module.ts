import { Module } from '@nestjs/common';

import { AppController } from '@app/app.controller';
import { AuthModule } from '@app/auth/auth.module';
import { ChannelModule } from '@app/channel/channel.module';
import { CommunityModule } from '@app/community/community.module';
import { SocialModule } from '@app/social/social.module';
import { TodoModule } from '@app/todo/todo.module';
import { TopicModule } from '@app/topic/topic.module';
import { UserModule } from '@app/user/user.module';
import { WishBucketModule } from '@app/wish-bucket/wish-bucket.module';

@Module({
  imports: [
    AuthModule,
    CommunityModule,
    SocialModule,
    UserModule,
    WishBucketModule,
    ChannelModule,
    TodoModule,
    TopicModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
