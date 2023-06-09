import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelController } from '@app/channel/channel.controller';
import { ChannelService } from '@app/channel/channel.service';
import { EventsGateway } from '@app/channel/events/events.gateway';
import { UserModule } from '@app/user/user.module';
import { ChannelChat } from '@domain/channel/channel-chat.entity';
import { Channel } from '@domain/channel/channel.entity';
import { ChannelMember } from '@domain/channel/channelMember.entity';
import { User } from '@domain/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel, ChannelMember, ChannelChat, User]),
    UserModule,
  ],
  controllers: [ChannelController],
  providers: [ChannelService, EventsGateway],
})
export class ChannelModule {}
