import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ChannelChat } from '@domain/channel/channel-chat.entity';
import { ChannelMember } from '@domain/channel/channelMember.entity';
import { User } from '@domain/user/user.entity';

@Entity('channels')
export class Channel {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  title: string;

  @Column({ type: 'boolean', unique: true })
  isPublic: boolean;

  @OneToMany(() => ChannelChat, (channelChat) => channelChat.channel)
  channelChats: ChannelChat[];

  @OneToMany(() => ChannelMember, (channelMembers) => channelMembers.channel, {
    cascade: ['insert'],
  })
  channelMembers: ChannelMember[];

  @OneToMany(() => User, (user) => user.channel)
  members: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
