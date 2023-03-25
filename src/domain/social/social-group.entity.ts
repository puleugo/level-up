import { IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SocialGroupProperties } from '@domain/social/social-group';
import { SocialGroupBoard } from '@domain/social/social-group-board.entity';
import { SocialGroupPlace } from '@domain/social/social-group-place.entity';
import { SocialGroupRecruitmentConditions } from '@domain/social/social-group-recruitment-conditions.entity';
import { SocialGroupReportLogs } from '@domain/social/social-group-report-logs.entity';
import { SocialGroupUser } from '@domain/social/social-group-user.entity';
import { User } from '@domain/user/user.entity';

@Entity('social_group_posts')
export class SocialGroupPost implements SocialGroupProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user)
  admin: User;

  @Column()
  recruitment: number;

  @Column({ type: 'int', default: 0 })
  memberCount: number;

  @OneToMany(() => SocialGroupUser, (socialGroupUser) => socialGroupUser)
  members: SocialGroupUser[];

  @ManyToOne(() => SocialGroupBoard, (socialGroupBoard) => socialGroupBoard)
  board: SocialGroupBoard;

  @OneToOne(
    () => SocialGroupRecruitmentConditions,
    (socialRecruitmentConditions) => socialRecruitmentConditions,
    { cascade: true },
  )
  @JoinColumn()
  recruitmentConditions: SocialGroupRecruitmentConditions;

  @Column()
  @IsUrl()
  thumbnailUrl: string;

  @Column({ type: 'boolean', default: false })
  needApprove: boolean;

  @Column({ type: 'date' })
  endAt: Date;

  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @OneToMany(() => User, (user) => user)
  likes: User[];

  @OneToOne(
    () => SocialGroupPlace,
    (socialGroupPlace) => socialGroupPlace.socialGroup,
    { cascade: true },
  )
  @JoinColumn()
  socialGroupPlace: SocialGroupPlace;

  @OneToMany(() => User, (user) => user)
  reportLogs: SocialGroupReportLogs[];

  @Column({ type: 'boolean' })
  isOffline: boolean;

  @Column({ type: 'timestamptz' })
  socialAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
