import { PostImage } from '@domain/post/post-image.entity';
import { Mission } from '@domain/todo/mission.entity';
import { User } from '@domain/user/user.entity';
export declare class Memoir {
    id: number;
    todoId: number;
    userId: string;
    logging: string | null;
    keep: string | null;
    problem: string | null;
    try: string | null;
    mission: Mission;
    images: PostImage[];
    author: User;
}
