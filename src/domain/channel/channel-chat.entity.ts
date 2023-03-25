import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Channel } from '@domain/channel/channel.entity';
import { User } from '@domain/user/user.entity';

@Index(['channelId', 'userId'])
@Entity('channel_chats')
export class ChannelChat {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  @Column({ type: 'int', nullable: true })
  channelId: number | null;

  @ManyToOne(() => User, (user) => user.channelChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.channelChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'channelId', referencedColumnName: 'id' })
  channel: Channel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
