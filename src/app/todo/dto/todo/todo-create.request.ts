import { TodoCreateRequestCommand } from '@app/todo/command/todo.command';

export class TodoCreateRequest implements TodoCreateRequestCommand {
  title: string;
  description?: string;
}
