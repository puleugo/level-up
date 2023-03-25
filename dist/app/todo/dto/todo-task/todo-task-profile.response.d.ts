import { TodoTaskProfileResponseCommand } from '@app/todo/command/todo-task.command';
import { TodoTaskStatus } from '@domain/user/todo-task';
export declare class TodoTaskProfileResponse implements TodoTaskProfileResponseCommand {
    id: number;
    title: string;
    description: string | null;
    todoId: number;
    todoTitle: string;
    status: TodoTaskStatus;
    constructor(task: TodoTaskProfileResponseCommand);
}
