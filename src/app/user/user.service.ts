import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

import { Coord2addressClient } from '@app/infrastructure/types/coord2address.client';
import {
  MissionAlarmResponseCommand,
  UserMissionResponseCommand,
} from '@app/todo/command/mission.command';
import {
  UserAddressResponseCommand,
  UserAddressUpdateRequestCommand,
  UserCreateRequestCommand,
  UserDetailProfileResponseCommand,
} from '@app/user/user.commands';
import {
  DuplicatedUsernameException,
  UserNotFoundException,
} from '@domain/errors/user.errors';
import { Mission } from '@domain/todo/mission.entity';
import { TodoStatus } from '@domain/todo/todo';
import { UserOauthType } from '@domain/user/oauth-type.entity';
import { UserAddress } from '@domain/user/user-address.entity';
import { UserProfile } from '@domain/user/user-profile.entity';
import { UserSns } from '@domain/user/user-sns.entity';
import { User } from '@domain/user/user.entity';
import { WishItem } from '@domain/wish-bucket/wish-item.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
    @InjectRepository(UserSns)
    private readonly userSnsRepository: Repository<UserSns>,
    @InjectRepository(UserOauthType)
    private readonly userOauthTypeRepository: Repository<UserOauthType>,
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,
    private readonly coord2addressClient: Coord2addressClient,
  ) {}

  async joinUser(data: UserCreateRequestCommand): Promise<User> {
    await this.isValidateUsername(data.authType.username);

    const user = await this.userRepository.save({
      ...data.user,
    });

    const userProfile = await this.userProfileRepository.save({
      user,
    });

    const userSns = await this.userSnsRepository.save({
      ...data.authType,
      user,
    });

    const userOauthType = await this.userOauthTypeRepository.save({
      snsType: data.authType.snsType,
      username: data.authType.username,
    });

    await this.userOauthTypeRepository.update(
      {
        id: userOauthType.id,
        snsType: userOauthType.snsType,
      },
      {
        userSNS: userSns,
      },
    );

    return await this.userRepository.save({
      ...user,
      profile: userProfile,
      authType: userSns,
    });
  }

  async isValidateUsername(username: string): Promise<void> {
    const user = await this.userOauthTypeRepository.count({
      where: { username },
    });
    if (user > 0) {
      throw new DuplicatedUsernameException();
    }
  }

  async findById(id: string, relations?: FindOptionsRelations<User>) {
    return await this.userRepository.findOne({ where: { id }, relations });
  }

  async findByUsername(username: string, select?: FindOptionsSelect<User>) {
    return await this.userOauthTypeRepository
      .findOne({
        where: { username },
        select,
        relations: ['userSNS', 'userSNS.user'],
      })
      .then((result) => result?.userSNS?.user);
  }

  async updateUserAddress(
    id: string,
    address: UserAddressUpdateRequestCommand,
  ): Promise<UserAddressResponseCommand> {
    const user = await this.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }

    const userAddress = await this.coord2addressClient.getCoord2address(
      address,
    );

    const updatedUserAddress = await this.userAddressRepository.save({
      user,
      latitude: address.latitude,
      longitude: address.longitude,
      region1DepthName: userAddress.region_1depth_name,
      region2DepthName: userAddress.region_2depth_name,
      region3DepthName: userAddress.region_3depth_name,
    });

    await this.userRepository.save({
      ...user,
      addressInfo: updatedUserAddress,
    });

    return updatedUserAddress;
  }

  async getProfileById(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
  }

  async getUserDetailProfile(data: {
    userId: string;
  }): Promise<UserDetailProfileResponseCommand> {
    const user = await this.findById(data.userId, { profile: true });
    console.log(user);
    return {
      id: user.id,
      nickname: user.nickname,
      mannerTemperature: user.profile.mannerTemperature,
      introduction: user.profile.introduction,
      profileImageUrl: user.profileImageUrl,
      followerCount: user.profile.followerCount,
      followingCount: user.profile.followingCount,
    };
  }

  async getWishItemsByUserId(userId: string): Promise<WishItem[]> {
    const user = await this.findById(userId);
    if (!user) throw new UserNotFoundException();

    const { wishItems } = await this.userRepository.findOne({
      where: { id: userId },
      select: ['wishItems'],
      relations: ['wishItems'],
    });

    return wishItems;
  }

  async findProgressById(
    userId: string,
  ): Promise<UserMissionResponseCommand[]> {
    const userTodos = await this.findMissionsById(userId, {
      missions: {
        todos: true,
      },
    });
    return userTodos.map((mission) => {
      const total = mission.todos.length;
      const completed = mission.todos.reduce((count, todo) => {
        return count + (todo.status === TodoStatus.DONE ? 1 : 0);
      }, 0);
      return {
        id: mission.id,
        teamId: mission.teamId,
        userId: mission.userId,
        startedAt: mission.startedAt,
        total,
        completed,
      };
    });
  }

  async findMissionsById(
    userId: string,
    relations?: FindOptionsRelations<User>,
  ): Promise<Mission[]> {
    const { missions } = await this.userRepository.findOne({
      where: { id: userId },
      relations,
    });
    return missions;
  }

  async findAlarmsById(userId: string): Promise<MissionAlarmResponseCommand[]> {
    return await this.missionRepository.find({
      where: { userId },
    });
  }
}
