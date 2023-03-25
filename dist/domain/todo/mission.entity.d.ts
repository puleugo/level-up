import { Memoir } from '@domain/post/memoir.entity';
import { Team } from '@domain/team/team.entity';
import { MissionProperties, MissionStatus } from '@domain/todo/mission';
import { Todo } from '@domain/todo/todo.entity';
import { User } from '@domain/user/user.entity';
export declare class Mission implements MissionProperties {
    id: number;
    title: string;
    description: string | null;
    userId: string;
    teamId: number | null;
    status: MissionStatus;
    user: User;
    team: Team;
    startedAt: Date;
    endedAt: Date;
    repeatDay: boolean[];
    alarmAt: Date;
    memoirs: Memoir[];
    todos: Todo[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
