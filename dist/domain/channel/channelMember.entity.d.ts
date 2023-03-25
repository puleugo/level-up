import { Channel } from '@domain/channel/channel.entity';
import { User } from '@domain/user/user.entity';
export declare class ChannelMember {
    id: number;
    userId: string;
    channelId: number;
    channel: Channel;
    user: User;
}
