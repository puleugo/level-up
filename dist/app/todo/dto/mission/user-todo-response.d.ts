import { UserMissionResponseCommand } from '@app/todo/command/mission.command';
export declare class UserTodoResponse implements UserMissionResponseCommand {
    id: number;
    title: string;
    teamId: number;
    userId: string;
    completed: number;
    total: number;
    startedAt: Date;
    constructor(todo: UserMissionResponseCommand);
}
