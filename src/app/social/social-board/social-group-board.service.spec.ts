import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MockRepository } from '@app/infrastructure/utils/mockRepository';
import { SocialGroupBoardService } from '@app/social/social-board/social-group-board.service';
import { SocialGroupType } from '@domain/social/social-group';
import { SocialGroupBoard } from '@domain/social/social-group-board.entity';

class MockSocialGroupBoardRepository extends MockRepository<SocialGroupBoard> {
  constructor() {
    super([
      {
        id: 'cbecd25c-09f0-4641-a892-8fd56ddf368b',
        category: SocialGroupType.EXERCISE,
        description: null,
        socialGroupPosts: [],
        createdAt: new Date(1995, 11, 17, 3, 24, 0),
        updatedAt: new Date(1995, 11, 17, 3, 24, 0),
        deletedAt: null,
      },
      {
        id: '022d8d36-f294-48e9-872c-4f308fa9d0e1',
        category: SocialGroupType.BUSINESS,
        description: null,
        socialGroupPosts: [],
        createdAt: new Date(1995, 11, 17, 3, 24, 0),
        updatedAt: new Date(1995, 11, 17, 3, 24, 0),
        deletedAt: null,
      },
    ]);
  }
}

describe('SocialBoardService', () => {
  let service: SocialGroupBoardService;
  let socialGroupBoardRepository: Repository<SocialGroupBoard>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialGroupBoardService,
        {
          provide: getRepositoryToken(SocialGroupBoard),
          useClass: MockSocialGroupBoardRepository,
        },
      ],
    }).compile();

    service = module.get<SocialGroupBoardService>(SocialGroupBoardService);
    socialGroupBoardRepository = module.get<Repository<SocialGroupBoard>>(
      getRepositoryToken(SocialGroupBoard),
    );
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('socialGroupRepository should be defined', () => {
    expect(socialGroupBoardRepository).toBeDefined();
  });

  it('should find SocialGroupBoard By Id', () => {
    expect(
      service.findById('cbecd25c-09f0-4641-a892-8fd56ddf368b'),
    ).resolves.toStrictEqual({
      id: 'cbecd25c-09f0-4641-a892-8fd56ddf368b',
      category: SocialGroupType.EXERCISE,
      description: null,
      socialGroupPosts: [],
      createdAt: new Date(1995, 11, 17, 3, 24, 0),
      updatedAt: new Date(1995, 11, 17, 3, 24, 0),
      deletedAt: null,
    });
  });

  it('should return null when try to find does not exist board', () => {
    expect(
      service.findById('afb0fcee-e636-4831-bffa-ac2cdbac6af9'),
    ).resolves.toBeNull();
  });

  it('should find SocialGroupBoard By Category', () => {
    expect(
      service.findByCategory(SocialGroupType.BUSINESS),
    ).resolves.toStrictEqual({
      id: '022d8d36-f294-48e9-872c-4f308fa9d0e1',
      category: SocialGroupType.BUSINESS,
      description: null,
      socialGroupPosts: [],
      createdAt: new Date(1995, 11, 17, 3, 24, 0),
      updatedAt: new Date(1995, 11, 17, 3, 24, 0),
      deletedAt: null,
    });
  });

  it('should return null when try to find does not exist board', () => {
    expect(service.findByCategory(SocialGroupType.ETC)).resolves.toBeNull();
  });

  it('should be return update data', () => {
    const updateData = {
      socialGroupBoardId: 'cbecd25c-09f0-4641-a892-8fd56ddf368b',
      data: {
        category: SocialGroupType.DANCE,
        description: 'test',
      },
    };

    expect(service.updateSocialGroupBoard(updateData)).resolves.toStrictEqual({
      id: 'cbecd25c-09f0-4641-a892-8fd56ddf368b',
      category: SocialGroupType.DANCE,
      description: 'test',
      socialGroupPosts: [],
      createdAt: new Date(1995, 11, 17, 3, 24, 0),
      updatedAt: new Date(1995, 11, 17, 3, 24, 0),
      deletedAt: null,
    });
  });

  it('should throw conflict error when try to update not exist data', () => {
    const updateData = {
      socialGroupBoardId: 'f27d674a-9f61-4ce7-ae28-cd9ac3661284',
      data: {
        category: SocialGroupType.BUSINESS,
        description: 'test',
      },
    };

    expect(service.updateSocialGroupBoard(updateData)).rejects.toThrowError();
  });

  it('should do softDelete', () => {
    expect(
      service.deleteSocialGroupBoard({
        socialGroupBoardId: 'cbecd25c-09f0-4641-a892-8fd56ddf368b',
      }),
    );

    expect(
      service.findById('cbecd25c-09f0-4641-a892-8fd56ddf368b'),
    ).resolves.toBeNull();
  });
});
