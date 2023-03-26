import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  BoardCreateRequestCommand,
  BoardProfileResponseCommand,
} from '@app/community/board/board.commands';
import { Board } from '@domain/community/board/board.entity';
import { Post } from '@domain/community/post/post.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async createBoard(data: {
    boardCreateRequest: BoardCreateRequestCommand;
  }): Promise<BoardProfileResponseCommand> {
    return await this.boardRepository.save({ ...data.boardCreateRequest });
  }

  async updateBoard(data: {
    boardId: string;
    boardUpdateRequest: BoardCreateRequestCommand;
  }): Promise<BoardProfileResponseCommand> {
    const board = await this.boardRepository.findOne({
      where: { id: data.boardId },
    });
    return await this.boardRepository.save({
      ...board,
      ...data.boardUpdateRequest,
    });
  }

  async deleteBoard(data: { boardId: string }): Promise<void> {
    await this.boardRepository.softDelete({ id: data.boardId });
    return;
  }

  async findById(boardId: string): Promise<Board> {
    return this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['posts'],
    });
  }
}
