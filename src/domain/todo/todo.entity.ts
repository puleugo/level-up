import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Mission } from '@domain/todo/mission.entity';
import { TodoProperties, TodoStatus } from '@domain/todo/todo';
import { User } from '@domain/user/user.entity';

@Entity('todos')
@Index(['userId', 'missionId'])
export class Todo implements TodoProperties {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'int' })
  missionId: number;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.BEFORE_START,
  })
  status: TodoStatus;

  // @Column({ type: 'timestamp' })
  // startedAt: Date;
  //
  // @Column({ type: 'timestamp' })
  // endedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Mission, (mission) => mission.todos)
  @JoinColumn({ name: 'mission_id', referencedColumnName: 'id' })
  mission: Mission;
}
