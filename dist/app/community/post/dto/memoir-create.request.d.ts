import { MemoirCreateRequestCommand } from '@app/community/post/commands/memoir.command';
export declare class MemoirCreateRequest implements MemoirCreateRequestCommand {
    todoId: number;
    logging: string | null;
    keep: string | null;
    problem: string | null;
    try: string | null;
    imagesUri: string[] | null;
    videosUri: string[] | null;
}
