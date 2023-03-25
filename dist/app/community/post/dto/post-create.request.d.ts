import { PostCreateRequestCommand } from '@app/community/post/commands/post.command';
import { User } from '@domain/user/user.entity';
export declare class PostCreateRequest implements PostCreateRequestCommand {
    title: string;
    content: string;
    author: User;
}
