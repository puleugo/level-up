import { TodoProfileResponseCommand } from '@app/todo/command/todo.command';
import { TodoStatus } from '@domain/todo/todo';

export class TodoProfileResponse implements TodoProfileResponseCommand {
  id: number;
  title: string;
  description: string | null;
  missionId: number;
  missionTitle: string;
  status: TodoStatus;

  constructor({
    id,
    title,
    description,
    missionId,
    missionTitle,
    status,
  }: TodoProfileResponseCommand) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.missionId = missionId;
    this.missionTitle = missionTitle;
    this.status = status;
  }
}
