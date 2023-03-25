import { MissionCreateRequestCommand } from '@app/todo/command/mission.command';
import { Team } from '@domain/team/team.entity';

export class MissionCreateRequest implements MissionCreateRequestCommand {
  title: string;
  description?: string;
  startedAt: Date;
  endedAt: Date;
  userId: string;
  repeatDay: boolean[];
  team: Team;
}
