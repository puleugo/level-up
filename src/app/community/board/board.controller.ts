import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BoardService } from '@app/community/board/board.service';
import { BoardCreateRequest } from '@app/community/board/dto/board-create.request';
import { BoardProfileResponse } from '@app/community/board/dto/board-profile.response';
import { BoardUpdateRequest } from '@app/community/board/dto/board-update.request';

@ApiTags('[커뮤니티] 게시판')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: '게시판 조회' })
  async getBoards(): Promise<BoardProfileResponse[]> {
    const boards = await this.boardService.getBoards();
    return boards.map((board) => new BoardProfileResponse(board));
  }

  @Post()
  @ApiOperation({ summary: '게시판 생성' })
  async createBoard(
    @Body() boardCreateRequest: BoardCreateRequest,
  ): Promise<BoardProfileResponse> {
    const board = await this.boardService.createBoard({ boardCreateRequest });
    return new BoardProfileResponse(board);
  }

  @Put(':boardId')
  @ApiOperation({ summary: '게시판 수정' })
  async updateBoard(
    @Param('boardId', ParseIntPipe) boardId: string,
    @Body() boardUpdateRequest: BoardUpdateRequest,
  ): Promise<BoardProfileResponse> {
    const board = await this.boardService.updateBoard({
      boardId,
      boardUpdateRequest,
    });
    return new BoardProfileResponse(board);
  }

  @Delete(':boardId')
  @ApiOperation({ summary: '게시판 삭제' })
  async deleteBoard(
    @Param('boardId', ParseIntPipe) boardId: string,
  ): Promise<void> {
    await this.boardService.deleteBoard({ boardId });
    return;
  }
}
