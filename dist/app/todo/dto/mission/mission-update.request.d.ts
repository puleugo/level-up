import { MissionUpdateRequestCommand } from '@app/todo/command/mission.command';
import { Team } from '@domain/team/team.entity';
export declare class MissionUpdateRequest implements MissionUpdateRequestCommand {
    id: number;
    title?: string;
    description?: string;
    startedAt?: Date;
    endedAt?: Date;
    userId?: string;
    repeatDay?: boolean[];
    team?: Team;
}
