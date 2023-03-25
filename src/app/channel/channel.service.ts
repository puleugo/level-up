import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventsGateway } from '@app/channel/events/events.gateway';
import { ChannelChat } from '@domain/channel/channel-chat.entity';
import { Channel } from '@domain/channel/channel.entity';
import { ChannelMember } from '@domain/channel/channelMember.entity';
import { User } from '@domain/user/user.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    @InjectRepository(ChannelMember)
    private channelMemberRepository: Repository<ChannelMember>,
    @InjectRepository(ChannelChat)
    private channelChatRepository: Repository<ChannelChat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async findById(channelId: number): Promise<Channel> {
    return await this.channelRepository.findOne({ where: { id: channelId } });
  }
}
