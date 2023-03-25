import { Memoir } from '@domain/post/memoir.entity';
import { Post } from '@domain/post/post.entity';
import { Team } from '@domain/team/team.entity';
import { ToDoProperties, TodoStatus } from '@domain/user/to-do';
import { ToDoTask } from '@domain/user/to-do-task.entity';
import { User } from '@domain/user/user.entity';
export declare class ToDo implements ToDoProperties {
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
    tasks: ToDoTask[];
    repeatDay: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
