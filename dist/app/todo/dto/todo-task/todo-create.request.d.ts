import { TodoCreateRequestCommand } from '@app/todo/command/todo.command';
export declare class TodoCreateRequest implements TodoCreateRequestCommand {
    title: string;
    description?: string;
}
