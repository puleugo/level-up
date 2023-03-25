import { Repository } from 'typeorm';
import { BoardCreateRequestCommand, BoardProfileResponseCommand } from '@app/community/board/board.commands';
import { Board } from '@domain/post/board.entity';
import { Post } from '@domain/post/post.entity';
export declare class BoardService {
    private readonly boardRepository;
    private readonly postRepository;
    constructor(boardRepository: Repository<Board>, postRepository: Repository<Post>);
    getBoards(): Promise<Board[]>;
    createBoard(data: {
        boardCreateRequest: BoardCreateRequestCommand;
    }): Promise<BoardProfileResponseCommand>;
    updateBoard(data: {
        boardId: string;
        boardUpdateRequest: BoardCreateRequestCommand;
    }): Promise<BoardProfileResponseCommand>;
    deleteBoard(data: {
        boardId: string;
    }): Promise<void>;
    findById(boardId: string): Promise<Board>;
}
