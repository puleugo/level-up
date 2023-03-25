import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BoardUpdateRequestCommand } from '@app/community/board/board.commands';
import { BoardService } from '@app/community/board/board.service';
import { BoardCreateRequest } from '@app/community/board/dto/board-create.request';
import { BoardProfileResponse } from '@app/community/board/dto/board-profile.response';

@ApiTags('[커뮤니티] 게시판')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getBoards(): Promise<BoardProfileResponse[]> {
    return this.boardService.getBoards();
  }

  @Post()
  async createBoard(
    @Body() boardCreateRequest: BoardCreateRequest,
  ): Promise<BoardProfileResponse> {
    const board = await this.boardService.createBoard({ boardCreateRequest });
    return new BoardProfileResponse(board);
  }

  @Put(':boardId')
  async updateBoard(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() boardUpdateRequest: BoardUpdateRequestCommand,
  ): Promise<BoardProfileResponse> {
    const board = await this.boardService.updateBoard({
      boardId,
      boardUpdateRequest,
    });
    return new BoardProfileResponse(board);
  }

  @Delete(':boardId')
  async deleteBoard(
    @Param('boardId', ParseUUIDPipe) boardId: string,
  ): Promise<void> {
    await this.boardService.deleteBoard({ boardId });
    return;
  }
}
