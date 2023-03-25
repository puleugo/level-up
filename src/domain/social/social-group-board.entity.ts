import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SocialGroupType } from '@domain/social/social-group';
import { SocialGroupPost } from '@domain/social/social-group.entity';

@Entity('social_group_boards')
export class SocialGroupBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SocialGroupType, unique: true })
  category: SocialGroupType;

  @Column({ nullable: true })
  description: string | null;

  @OneToMany(() => SocialGroupPost, (socialGroupPost) => socialGroupPost.board)
  socialGroupPosts: SocialGroupPost[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
