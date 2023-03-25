import { UserTodoResponseCommand } from '@app/todo/todo.command';
export declare class UserTodoResponse implements UserTodoResponseCommand {
    id: number;
    title: string;
    teamId: number;
    userId: string;
    completed: number;
    total: number;
    startedAt: Date;
    constructor(todo: UserTodoResponseCommand);
}
