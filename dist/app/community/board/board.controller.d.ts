import { BoardUpdateRequestCommand } from '@app/community/board/board.commands';
import { BoardService } from '@app/community/board/board.service';
import { BoardCreateRequest } from '@app/community/board/dto/board-create.request';
import { BoardProfileResponse } from '@app/community/board/dto/board-profile.response';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    getBoards(): Promise<BoardProfileResponse[]>;
    createBoard(boardCreateRequest: BoardCreateRequest): Promise<BoardProfileResponse>;
    updateBoard(boardId: string, boardUpdateRequest: BoardUpdateRequestCommand): Promise<BoardProfileResponse>;
    deleteBoard(boardId: string): Promise<void>;
}
