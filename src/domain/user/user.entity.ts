import { IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ChannelChat } from '@domain/channel/channel-chat.entity';
import { Channel } from '@domain/channel/channel.entity';
import { ChannelMember } from '@domain/channel/channelMember.entity';
import { Memoir } from '@domain/post/memoir.entity';
import { PostComment } from '@domain/post/post-comment.entity';
import { PostLike } from '@domain/post/post-like.entity';
import { Post } from '@domain/post/post.entity';
import { SocialGroupReportLogs } from '@domain/social/social-group-report-logs.entity';
import { SocialGroupUser } from '@domain/social/social-group-user.entity';
import { Mission } from '@domain/todo/mission.entity';
import { Todo } from '@domain/todo/todo.entity';
import { UserProperties } from '@domain/user/user';
import { UserAddress } from '@domain/user/user-address.entity';
import { UserProfile } from '@domain/user/user-profile.entity';
import { UserSns } from '@domain/user/user-sns.entity';
import { UserFollow } from '@domain/user/user.follow.entity';
import { WishItem } from '@domain/wish-bucket/wish-item.entity';

@Entity('users')
export class User implements UserProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  @IsUrl()
  profileImageUrl: string;

  @OneToOne(() => UserSns, (userSns) => userSns)
  @JoinColumn()
  authType: UserSns;

  @OneToMany(() => Post, (post) => post)
  posts: Post[];

  @OneToMany(() => PostComment, (postComment) => postComment)
  comments: PostComment[];

  @OneToOne(() => UserProfile, (userProfile) => userProfile, {
    cascade: ['insert', 'soft-remove'],
  })
  @JoinColumn()
  profile: UserProfile;

  @OneToMany(() => Mission, (userTodo) => userTodo)
  missions: Mission[];

  @OneToMany(() => UserFollow, (follow) => follow.user)
  followings: UserFollow[];

  @OneToMany(() => UserFollow, (follow) => follow.following)
  followers: UserFollow[];

  @OneToMany(() => SocialGroupUser, (socialGroupUser) => socialGroupUser)
  socialGroups: SocialGroupUser[];

  @OneToOne(() => UserAddress, (userAddress) => userAddress)
  addressInfo: UserAddress;

  @OneToMany(() => SocialGroupReportLogs, (reportLogs) => reportLogs)
  reportLogs: SocialGroupReportLogs[];

  @OneToMany(() => PostLike, (postLike) => postLike)
  likes: PostLike[];

  @OneToMany(() => WishItem, (wishItem) => wishItem)
  wishItems: WishItem[];

  @OneToMany(() => ChannelChat, (channelChat) => channelChat)
  channelChats: ChannelChat[];

  @OneToMany(() => ChannelMember, (channelMember) => channelMember.user)
  ChannelMembers: ChannelMember[];

  @ManyToOne(() => Channel, (channel) => channel.members)
  @JoinTable({
    name: 'channel_members',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'channelId',
      referencedColumnName: 'id',
    },
  })
  channel: Channel;

  @OneToMany(() => Memoir, (memoir) => memoir.author)
  memoirs: Memoir[];

  @OneToMany(() => Todo, (toDoTask) => toDoTask.user)
  tasks: Todo[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
