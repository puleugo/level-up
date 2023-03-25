import { Memoir } from '@domain/post/memoir.entity';
import { Post } from '@domain/post/post.entity';
import { Team } from '@domain/team/team.entity';
import { TodoProperties, TodoStatus } from '@domain/user/todo';
import { TodoTask } from '@domain/user/todo-task.entity';
import { User } from '@domain/user/user.entity';
export declare class Todo implements TodoProperties {
    id: number;
    title: string;
    description: string | null;
    userId: string;
    teamId: number | null;
    status: TodoStatus;
    user: User;
    post: Post[];
    team: Team;
    startedAt: Date;
    endedAt: Date | null;
    memoirs: Memoir[];
    tasks: TodoTask[];
    repeatDay: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
