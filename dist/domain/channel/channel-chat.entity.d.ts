import { Channel } from '@domain/channel/channel.entity';
import { User } from '@domain/user/user.entity';
export declare class ChannelChat {
    id: number;
    content: string;
    userId: string | null;
    channelId: number | null;
    user: User;
    channel: Channel;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
