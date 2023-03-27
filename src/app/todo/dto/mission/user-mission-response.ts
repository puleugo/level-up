import { UserMissionResponseCommand } from '@app/todo/command/mission.command';

export class UserMissionResponse implements UserMissionResponseCommand {
  id: number;
  title: string;
  teamId: number;
  userId: string;
  total: number;
  completed: number;
  startedAt: Date;

  constructor({
    id,
    title,
    teamId,
    userId,
    total,
    completed,
    startedAt,
  }: UserMissionResponseCommand) {
    this.id = id;
    this.title = title;
    this.teamId = teamId;
    this.userId = userId;
    this.startedAt = startedAt;
    this.total = total;
    this.completed = completed;
  }
}
