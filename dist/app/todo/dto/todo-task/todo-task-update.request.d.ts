import { TodoTaskUpdateRequestCommand } from '@app/todo/command/todo-task.command';
import { TodoTaskStatus } from '@domain/user/todo-task';
export declare class TodoTaskUpdateRequest implements TodoTaskUpdateRequestCommand {
    title?: string;
    description?: string;
    status?: TodoTaskStatus;
}
