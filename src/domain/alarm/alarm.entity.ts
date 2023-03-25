import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Todo } from '@domain/todo/todo.entity';
import { User } from '@domain/user/user.entity';

@Entity('alarms')
export class Alarm {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('int')
  todoId: number;

  @Column('time')
  alarmAt: Date;

  user: User;

  todo: Todo;
}
