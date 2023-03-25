import { Repository } from 'typeorm';
import { EventsGateway } from '@app/channel/events/events.gateway';
import { ChannelChat } from '@domain/channel/channel-chat.entity';
import { Channel } from '@domain/channel/channel.entity';
import { ChannelMember } from '@domain/channel/channelMember.entity';
import { User } from '@domain/user/user.entity';
export declare class ChannelService {
    private channelRepository;
    private channelMemberRepository;
    private channelChatRepository;
    private userRepository;
    private readonly eventsGateway;
    constructor(channelRepository: Repository<Channel>, channelMemberRepository: Repository<ChannelMember>, channelChatRepository: Repository<ChannelChat>, userRepository: Repository<User>, eventsGateway: EventsGateway);
    findById(channelId: number): Promise<Channel>;
}
