import { MissionAlarmResponseCommand } from '@app/todo/command/mission.command';

export class MissionAlarmResponse implements MissionAlarmResponseCommand {
  id: number;
  isTeamAlarm: boolean;
  alarmAt: Date;
  teamId: number | null;

  constructor(mission: MissionAlarmResponseCommand) {
    Object.assign(this, mission);
    this.isTeamAlarm = !!mission.teamId;
  }
}
