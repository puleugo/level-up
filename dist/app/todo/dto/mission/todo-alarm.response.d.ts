import { MissionAlarmResponseCommand } from '@app/todo/command/mission.command';
export declare class MissionAlarmResponse implements MissionAlarmResponseCommand {
    id: number;
    isTeamAlarm: boolean;
    alarmAt: Date;
    teamId: number | null;
    constructor(mission: MissionAlarmResponseCommand);
}
