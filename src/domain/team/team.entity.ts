import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserTeam } from '@domain/team/user-team.entity';
import { Mission } from '@domain/todo/mission.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'uuid' })
  ownerId: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => Mission, (todo) => todo.team)
  todos: Mission[];

  @OneToMany(() => UserTeam, (userTeam) => userTeam.team)
  userTeams: UserTeam[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
