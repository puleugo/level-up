import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '@app/user/user.service';
import { UserOauthType } from '@domain/user/oauth-type.entity';
import { UserSNS } from '@domain/user/user';
import { UserAddress } from '@domain/user/user-address.entity';
import { UserProfile } from '@domain/user/user-profile.entity';
import { UserSns } from '@domain/user/user-sns.entity';
import { User } from '@domain/user/user.entity';
import { Coord2addressClient } from '@infrastructure/types/coord2address.client';
import { MockRepository } from '@infrastructure/utils/mockRepository';

class MockUserRepository extends MockRepository<User> {
  constructor() {
    super([]);
  }
}

class MockUserProfileRepository extends MockRepository<UserProfile> {}

class MockUserAddressRepository extends MockRepository<UserAddress> {}

class MockUserSnsRepository extends MockRepository<UserSns> {}

class MockUserOauthTypeRepository extends MockRepository<UserOauthType> {}

describe('AuthService', () => {
  let userService: UserService;
  let coord2addressClient: Coord2addressClient;
  let userRepository: Repository<User>;
  let userProfileRepository: Repository<UserProfile>;
  let userAddressRepository: Repository<UserAddress>;
  let userSnsRepository: Repository<UserSns>;
  let userOauthTypeRepository: Repository<UserOauthType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        Coord2addressClient,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(UserProfile),
          useClass: MockUserProfileRepository,
        },
        {
          provide: getRepositoryToken(UserAddress),
          useClass: MockUserAddressRepository,
        },
        {
          provide: getRepositoryToken(UserSns),
          useClass: MockUserSnsRepository,
        },
        {
          provide: getRepositoryToken(UserOauthType),
          useClass: MockUserOauthTypeRepository,
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    coord2addressClient = module.get<Coord2addressClient>(Coord2addressClient);

    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    userProfileRepository = module.get<Repository<UserProfile>>(
      getRepositoryToken(UserProfile),
    );
    userAddressRepository = module.get<Repository<UserAddress>>(
      getRepositoryToken(UserAddress),
    );
    userSnsRepository = module.get<Repository<UserSns>>(
      getRepositoryToken(UserSns),
    );
    userOauthTypeRepository = module.get<Repository<UserOauthType>>(
      getRepositoryToken(UserOauthType),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(coord2addressClient).toBeDefined();

    expect(userRepository).toBeDefined();
    expect(userProfileRepository).toBeDefined();
    expect(userAddressRepository).toBeDefined();
    expect(userSnsRepository).toBeDefined();
    expect(userOauthTypeRepository).toBeDefined();
  });

  it('should be create User', () => {});
});
