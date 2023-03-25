import { TodoUpdateRequestCommand } from '@app/todo/todo.command';
import { Team } from '@domain/team/team.entity';
export declare class TodoUpdateRequest implements TodoUpdateRequestCommand {
    id: number;
    title?: string;
    description?: string;
    startedAt?: Date;
    endedAt?: Date;
    userId?: string;
    repeatDay?: number;
    team?: Team;
}
