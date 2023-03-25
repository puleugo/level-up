import { PostUpdateRequestCommand } from '@app/community/post/commands/post.command';
export declare class PostUpdateRequest implements PostUpdateRequestCommand {
    title: string;
    content: string;
}
