import { TodoUpdateRequestCommand } from '@app/todo/command/todo.command';
import { TodoStatus } from '@domain/todo/todo';

export class TodoUpdateRequest implements TodoUpdateRequestCommand {
  title?: string;
  description?: string;
  status?: TodoStatus;
}
