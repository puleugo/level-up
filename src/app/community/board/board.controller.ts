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
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BoardService } from '@app/community/board/board.service';
import { BoardCreateRequest } from '@app/community/board/dto/board-create.request';
import { BoardProfileResponse } from '@app/community/board/dto/board-profile.response';
import { BoardUpdateRequest } from '@app/community/board/dto/board-update.request';
import { BOARD_ERRORS } from '@domain/errors/community/board/board.errors';
import { TOPIC_ERRORS } from '@domain/errors/topic/topic.errors';

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
  @ApiNotFoundResponse({ description: TOPIC_ERRORS.TOPIC_NOT_FOUND })
  async createBoard(
    @Body() boardCreateRequest: BoardCreateRequest,
  ): Promise<BoardProfileResponse> {
    const board = await this.boardService.createBoard({ boardCreateRequest });
    return new BoardProfileResponse(board);
  }

  @Put(':boardId')
  @ApiOperation({ summary: '게시판 수정' })
  @ApiNotFoundResponse({ description: BOARD_ERRORS.BOARD_NOT_FOUND })
  async updateBoard(
    @Param('boardId', ParseIntPipe) boardId: number,
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
  @ApiNotFoundResponse({ description: BOARD_ERRORS.BOARD_NOT_FOUND })
  async deleteBoard(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<void> {
    await this.boardService.deleteBoard({ boardId });
    return;
  }
}
