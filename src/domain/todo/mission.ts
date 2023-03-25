import { Memoir } from '@domain/post/memoir.entity';
import { Team } from '@domain/team/team.entity';
import { Todo } from '@domain/todo/todo.entity';
import { User } from '@domain/user/user.entity';

export enum MissionStatus {
  BEFORE_START = 'BEFORE_START',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type MissionProperties = {
  id: number;
  title: string;
  description: string | null;
  userId: string;
  teamId: number | null;
  status: MissionStatus;
  user: User;
  team: Team;
  todos: Todo[];
  startedAt: Date;
  endedAt: Date;
  alarmAt: Date;
  memoirs: Memoir[];
  repeatDay: boolean[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
