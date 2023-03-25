import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Team } from '@domain/team/team.entity';
import { User } from '@domain/user/user.entity';

export enum TeamRole {
  OWNER = 'OWNER',
  TEAM_MEMBER = 'TEAM_MEMBER',
}

@Entity('user_teams')
export class UserTeam {
  @PrimaryColumn({ type: 'int' })
  teamId: number;

  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @Column({ type: 'enum', enum: TeamRole, default: TeamRole.TEAM_MEMBER })
  isOwner: TeamRole;

  @ManyToOne(() => Team, (team) => team.userTeams)
  team: Team;

  @ManyToOne(() => User, (user) => user.userTeams)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
