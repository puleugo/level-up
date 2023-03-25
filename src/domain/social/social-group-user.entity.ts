import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  SocialGroupMemberRole,
  SocialGroupMembersProperties,
  SocialGroupMemberStatus,
} from '@domain/social/social-group';
import { SocialGroupPost } from '@domain/social/social-group.entity';
import { User } from '@domain/user/user.entity';

@Entity('social_group_users')
export class SocialGroupUser implements SocialGroupMembersProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SocialGroupPost, (socialGroupPost) => socialGroupPost)
  socialGroup: SocialGroupPost;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @Column({ type: 'enum', enum: SocialGroupMemberStatus })
  userStatus: SocialGroupMemberStatus;

  @Column({ type: 'enum', enum: SocialGroupMemberRole })
  userRole: SocialGroupMemberRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
