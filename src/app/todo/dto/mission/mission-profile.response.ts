import { MissionResponseCommand } from '@app/todo/command/mission.command';

export class MissionProfileResponse implements MissionResponseCommand {
  id: number;
  title: string;
  teamId: number;
  userId: string;
  startedAt: Date;
  endedAt: Date;

  constructor(todo: MissionResponseCommand) {
    Object.assign(this, todo);
  }
}
