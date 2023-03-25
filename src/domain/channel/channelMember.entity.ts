import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Channel } from '@domain/channel/channel.entity';
import { User } from '@domain/user/user.entity';

@Index(['userId'])
@Entity('channel_members')
export class ChannelMember {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ primary: true, type: 'uuid' })
  userId: string;

  @Column({ primary: true, type: 'int' })
  channelId: number;

  @ManyToOne(() => Channel, (channels) => channels.channelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  channel: Channel;

  @ManyToOne(() => User, (user) => user.ChannelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
