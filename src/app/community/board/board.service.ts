import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  BoardCreateRequestCommand,
  BoardProfileResponseCommand,
} from '@app/community/board/board.commands';
import { Board } from '@domain/community/board/board.entity';
import { Post } from '@domain/community/post/post.entity';
import { Topic } from '@domain/topic/topic.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async getBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async createBoard(data: {
    boardCreateRequest: BoardCreateRequestCommand;
  }): Promise<BoardProfileResponseCommand> {
    const topic = await this.topicRepository.findOne({
      where: { topic: data.boardCreateRequest.topic },
    });

    return await this.boardRepository.save({
      ...data.boardCreateRequest,
      topic,
    });
  }

  async updateBoard(data: {
    boardId: number;
    boardUpdateRequest: BoardCreateRequestCommand;
  }): Promise<BoardProfileResponseCommand> {
    const board = await this.boardRepository.findOne({
      where: { id: data.boardId },
      relations: { topic: true },
    });

    const topic = await this.topicRepository.findOne({
      where: { topic: data.boardUpdateRequest.topic },
    });

    await this.boardRepository.update(board.id, {
      ...data.boardUpdateRequest,
      topic,
    });

    return await this.boardRepository.findOne({ where: { id: board.id } });
  }

  async deleteBoard(data: { boardId: number }): Promise<void> {
    await this.boardRepository.softDelete({ id: data.boardId });
    return;
  }

  async findById(boardId: number): Promise<Board> {
    return this.boardRepository.findOne({
      where: { id: boardId },
    });
  }
}
