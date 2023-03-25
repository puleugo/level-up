import { TodoTaskCreateRequestCommand } from '@app/todo/command/todo-task.command';
export declare class TodoTaskCreateRequest implements TodoTaskCreateRequestCommand {
    title: string;
    description?: string;
}
