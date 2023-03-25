import { UserMissionResponseCommand } from '@app/todo/command/mission.command';

export class UserTodoResponse implements UserMissionResponseCommand {
  id: number;
  title: string;
  teamId: number;
  userId: string;
  completed: number;
  total: number;
  startedAt: Date;

  constructor(todo: UserMissionResponseCommand) {
    Object.assign(this, todo);
  }
}
