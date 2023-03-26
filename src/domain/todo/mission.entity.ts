import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Memoir } from '@domain/community/post/memoir.entity';
import { Team } from '@domain/team/team.entity';
import { MissionProperties, MissionStatus } from '@domain/todo/mission';
import { Todo } from '@domain/todo/todo.entity';
import { User } from '@domain/user/user.entity';

@Entity('missions')
@Index(['userId', 'teamId'])
export class Mission implements MissionProperties {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'int', nullable: true })
  teamId: number | null;

  @Column({
    type: 'enum',
    enum: MissionStatus,
    default: MissionStatus.BEFORE_START,
  })
  status: MissionStatus;

  @ManyToOne(() => User, (user) => user.missions, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Team, (team) => team, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'teamId', referencedColumnName: 'id' })
  team: Team;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  endedAt: Date;

  @Column({ type: 'simple-array' })
  repeatDay: boolean[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  alarmAt: Date;

  @OneToMany(() => Memoir, (memoir) => memoir.mission)
  memoirs: Memoir[];

  @OneToMany(() => Todo, (task) => task.mission)
  todos: Todo[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
