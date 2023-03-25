import { TodoTaskStatus } from '@domain/user/to-do';
import { Todo } from '@domain/user/todo.entity';
import { User } from '@domain/user/user.entity';
export declare class ToDoTask {
    id: number;
    title: string;
    description: string | null;
    userId: string;
    todoId: number;
    status: TodoTaskStatus;
    user: User;
    toDo: Todo;
}
