import { BoardCreateRequestCommand } from '@app/community/board/board.commands';
import { PostType } from '@domain/post/post';
export declare class BoardCreateRequest implements BoardCreateRequestCommand {
    title: PostType;
    description: string | null;
}
