import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SocialGroupBoardUpdateRequestCommand } from '@app/social/social-board/commands/social-group-board.commands';
import {
  SocialGroupBoardNotFoundException,
  SocialGroupBoardAlreadyExistsException,
} from '@domain/errors/social/social-group-board.errors';
import { SocialGroupType } from '@domain/social/social-group';
import { SocialGroupBoard } from '@domain/social/social-group-board.entity';

@Injectable()
export class SocialGroupBoardService {
  constructor(
    @InjectRepository(SocialGroupBoard)
    private readonly socialGroupBoardRepository: Repository<SocialGroupBoard>,
  ) {}

  async getSocialGroupBoards(): Promise<SocialGroupBoard[]> {
    return await this.socialGroupBoardRepository.find();
  }

  async findById(id: string): Promise<SocialGroupBoard> {
    return await this.socialGroupBoardRepository.findOne({ where: { id } });
  }

  async findByCategory(category: SocialGroupType): Promise<SocialGroupBoard> {
    return await this.socialGroupBoardRepository.findOne({
      where: { category },
    });
  }

  async initSocialGroupBoards(): Promise<SocialGroupBoard[]> {
    const communityCategories: SocialGroupType[] = Object.values(
      SocialGroupType,
    ).filter((key) => typeof key === 'string');

    return await Promise.all(
      communityCategories.map((category) => {
        return this.socialGroupBoardRepository.save({
          category,
        });
      }),
    );
  }

  async createSocialGroupBoard(data: {
    category: SocialGroupType;
    description?: string;
  }): Promise<SocialGroupBoard> {
    const board = await this.findByCategory(data.category);
    if (board) {
      throw new SocialGroupBoardAlreadyExistsException();
    }
    return await this.socialGroupBoardRepository.save(data);
  }

  async updateSocialGroupBoard(data: {
    socialGroupBoardId: string;
    data: SocialGroupBoardUpdateRequestCommand;
  }): Promise<SocialGroupBoard> {
    const board = await this.findById(data.socialGroupBoardId);
    if (!board) {
      throw new SocialGroupBoardNotFoundException();
    }
    return await this.socialGroupBoardRepository.save({
      ...board,
      ...data.data,
    });
  }

  async deleteSocialGroupBoard(data: {
    socialGroupBoardId: string;
  }): Promise<void> {
    await this.socialGroupBoardRepository.softDelete(data.socialGroupBoardId);
    return;
  }
}
