// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
//
// import { MockRepository } from '@app/infrastructure/utils/mockRepository';
// import { SocialGroupBoardService } from '@app/social/social-board/social-group-board.service';
// import { SocialGroupPostService } from '@app/social/social-post/social-group-post.service';
// import { UserService } from '@app/user/user.service';
// import { SocialGroupBoard } from '@domain/social/social-group-board.entity';
// import { SocialGroupPlace } from '@domain/social/social-group-place.entity';
// import { SocialGroupUser } from '@domain/social/social-group-user.entity';
// import { SocialGroupPost } from '@domain/social/social-group.entity';
// import { UserOauthType } from '@domain/user/oauth-type.entity';
// import { UserAddress } from '@domain/user/user-address.entity';
// import { UserProfile } from '@domain/user/user-profile.entity';
// import { UserSns } from '@domain/user/user-sns.entity';
// import { User } from '@domain/user/user.entity';
//
// class MockSocialGroupUserRepository extends MockRepository<SocialGroupUser> {}
// class MockSocialGroupBoardRepository extends MockRepository<SocialGroupBoard> {}
// class MockSocialGroupPlaceRepository extends MockRepository<SocialGroupPlace> {}
// class MockUserRepository extends MockRepository<User> {}
//
// describe('SocialPostService', () => {
//   let socialGroupPostService: SocialGroupPostService;
//   let socialGroupBoardService: SocialGroupBoardService;
//   let userService: UserService;
//
//   let socialGroupPostRepository: Repository<SocialGroupPost>;
//   let socialGroupUserRepository: Repository<SocialGroupUser>;
//   let socialGroupPlaceRepository: Repository<SocialGroupPlace>;
//   let userRepository: Repository<User>;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         SocialGroupPostService,
//         UserService,
//         SocialGroupBoardService,
//         {
//           provide: getRepositoryToken(SocialGroupPost),
//           useClass: MockSocialGroupBoardRepository,
//         },
//         {
//           provide: getRepositoryToken(SocialGroupUser),
//           useClass: MockSocialGroupUserRepository,
//         },
//         {
//           provide: getRepositoryToken(SocialGroupPlace),
//           useClass: MockSocialGroupPlaceRepository,
//         },
//         {
//           provide: getRepositoryToken(User),
//           useClass: MockUserRepository,
//         },
//       ],
//     }).compile();
//
//     socialGroupPostService = module.get<SocialGroupPostService>(
//       SocialGroupPostService,
//     );
//     userService = module.get<UserService>(UserService);
//     socialGroupBoardService = module.get<SocialGroupBoardService>(
//       SocialGroupBoardService,
//     );
//
//     socialGroupPostRepository = module.get<Repository<SocialGroupPost>>(
//       getRepositoryToken(SocialGroupBoard),
//     );
//     socialGroupUserRepository = module.get<Repository<SocialGroupUser>>(
//       getRepositoryToken(SocialGroupUser),
//     );
//     socialGroupPlaceRepository = module.get<Repository<SocialGroupPlace>>(
//       getRepositoryToken(SocialGroupPlace),
//     );
//     userRepository = module.get<Repository<User>>(getRepositoryToken(User));
//   });
//
//   it('socialGroupPostService should be defined', () => {
//     expect(socialGroupPostService).toBeDefined();
//   });
//   it('socialGroupBoardService should be defined', () => {
//     expect(socialGroupBoardService).toBeDefined();
//   });
//   it('userService should be defined', () => {
//     expect(userService).toBeDefined();
//   });
// });
