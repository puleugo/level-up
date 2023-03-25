import { TodoCreateRequestCommand } from '@app/todo/todo.command';
import { Team } from '@domain/team/team.entity';
export declare class TodoCreateRequest implements TodoCreateRequestCommand {
    title: string;
    description?: string;
    startedAt: Date;
    endedAt: Date;
    userId: string;
    repeatDay: number;
    team: Team;
}
