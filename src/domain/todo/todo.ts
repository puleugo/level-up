import { Mission } from '@domain/todo/mission.entity';
import { User } from '@domain/user/user.entity';

export enum TodoStatus {
  BEFORE_START = 'BEFORE_START',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type TodoProperties = {
  id: number;
  title: string;
  description: string | null;
  userId: string;
  missionId: number;
  missionTitle?: string;
  // startedAt: Date;
  // endedAt: Date;
  status: TodoStatus;
  user: User;
  mission: Mission;
};
