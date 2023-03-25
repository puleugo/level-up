import { BoardProfileResponseCommand } from '@app/community/board/board.commands';
import { PostType } from '@domain/post/post';
export declare class BoardProfileResponse implements BoardProfileResponseCommand {
    id: string;
    title: PostType;
    description: string | null;
    constructor(board: BoardProfileResponseCommand);
}
