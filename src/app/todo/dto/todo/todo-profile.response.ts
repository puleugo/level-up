import { TodoProfileResponseCommand } from '@app/todo/command/todo.command';
import { TodoStatus } from '@domain/todo/todo';

export class TodoProfileResponse implements TodoProfileResponseCommand {
  id: number;
  title: string;
  description: string | null;
  missionId: number;
  missionTitle: string;
  status: TodoStatus;

  constructor(todo: TodoProfileResponseCommand) {
    Object.assign(this, todo);
    this.missionTitle = todo.missionTitle;
  }
}
