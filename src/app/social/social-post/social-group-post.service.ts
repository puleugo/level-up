import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';

import { SocialGroupBoardService } from '@app/social/social-board/social-group-board.service';
import {
  getSocialProfileCommand,
  SocialCreateRequestCommand,
  SocialListQuery,
  SocialProfileResponseCommand,
  SocialUpdateRequestCommand,
} from '@app/social/social-post/commands/social.commands';
import { SocialMemberProfileResponse } from '@app/social/social-post/dto/social-member-profile.response';
import { SocialPreviewResponse } from '@app/social/social-post/dto/social-preview.response';
import { SocialProfileResponse } from '@app/social/social-post/dto/social-profile.response';
import { UserProfileCommand } from '@app/user/user.commands';
import { UserService } from '@app/user/user.service';
import {
  DontHaveToRequest,
  HaveToRequestJoin,
  SocialAdminCantLeave,
  SocialAdminCantRequestInvite,
  SocialCantKickAdmin,
  SocialCantLeaveAtNotJoin,
  SocialNotFoundException,
  SocialPlaceNotFound,
  SocialRequestAlreadyExist,
  SocialRequestNotFoundException,
  SocialUserIsNotAdmin,
  SocialUserNotFoundException,
} from '@domain/errors/social.errors';
import { UserNotFoundException } from '@domain/errors/user.errors';
import {
  SocialGroupMemberRole,
  SocialGroupMemberStatus,
} from '@domain/social/social-group';
import { SocialGroupPlace } from '@domain/social/social-group-place.entity';
import { SocialGroupUser } from '@domain/social/social-group-user.entity';
import { SocialGroupPost } from '@domain/social/social-group.entity';
import { User } from '@domain/user/user.entity';

@Injectable()
export class SocialGroupPostService {
  constructor(
    @InjectRepository(SocialGroupPost)
    private readonly socialGroupPostRepository: Repository<SocialGroupPost>,
    @InjectRepository(SocialGroupUser)
    private readonly socialGroupUserRepository: Repository<SocialGroupUser>,
    @InjectRepository(SocialGroupPlace)
    private readonly socialGroupPlaceRepository: Repository<SocialGroupPlace>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly socialBoardService: SocialGroupBoardService,
  ) {}

  async getSocials(
    data: SocialListQuery,
  ): Promise<Pagination<SocialPreviewResponse>> {
    const { items, meta } = await paginate(
      this.socialGroupPostRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        where: {
          board: { id: data.socialGroupBoardId },
        },
        relations: ['socialPlace', 'admin'],
        order: {
          createdAt: 'DESC',
        },
      },
    );

    return {
      items: items.map(
        (socialGroup) =>
          new SocialPreviewResponse({
            category: socialGroup.board.category,
            ...socialGroup,
            region3DepthName: socialGroup.socialGroupPlace?.region3DepthName,
          }),
      ),
      meta,
    };
  }

  async getSocialProfile(
    data: getSocialProfileCommand,
  ): Promise<SocialProfileResponseCommand> {
    const socialGroup = await this.findById(data.socialGroupPostId, {
      board: true,
    });
    if (!socialGroup) throw new SocialNotFoundException();

    socialGroup.members = await this.findMembersById(socialGroup.id, {
      userStatus: SocialGroupMemberStatus.JOINED,
    });
    return {
      ...socialGroup,
      category: socialGroup.board.category,
      members: socialGroup.members.map(
        (member) =>
          new SocialMemberProfileResponse({ ...member, ...member.user }),
      ),
    };
  }

  async getSocialInviteRequestList(data: {
    socialGroupPostId: string;
    admin: UserProfileCommand;
  }): Promise<SocialGroupUser[]> {
    const socialGroup = await this.findById(data.socialGroupPostId);
    if (!socialGroup) throw new SocialNotFoundException();

    const user = await this.userService.findById(data.admin.id);
    if (!user) throw new UserNotFoundException();
    if (socialGroup.admin.id !== user.id) throw new SocialUserIsNotAdmin();

    return await this.findMembersById(socialGroup.id, {
      userStatus: SocialGroupMemberStatus.WAITING,
    });
  }

  async createSocial(data: {
    socialGroupBoardId: string;
    data: SocialCreateRequestCommand;
    user: UserProfileCommand;
  }): Promise<SocialProfileResponseCommand> {
    const socialGroupBoard = await this.socialBoardService.findById(
      data.socialGroupBoardId,
    );

    const admin = await this.userService.findById(data.user.id);
    if (!admin) throw new UserNotFoundException();

    if (data.data.isOffline) {
      if (!data.data.socialPlace) throw new SocialPlaceNotFound();

      const socialGroup = await this.generateSocialGroup(
        socialGroupBoard.id,
        data.data,
        admin,
      );

      return new SocialProfileResponse({
        ...socialGroup,
        members: socialGroup.members.map(
          (member) =>
            new SocialMemberProfileResponse({ ...member, ...member.user }),
        ),
        category: socialGroupBoard.category,
      });
    }
    const socialGroup = await this.generateSocialGroup(
      socialGroupBoard.id,
      data.data,
      admin,
    );

    return new SocialProfileResponse({
      ...socialGroup,
      members: socialGroup.members.map(
        (member) =>
          new SocialMemberProfileResponse({ ...member, ...member.user }),
      ),
      category: socialGroupBoard.category,
    });
  }

  async requestInviteSocial(data: {
    socialGroupPostId: string;
    user: UserProfileCommand;
  }): Promise<boolean> {
    const socialGroup = await this.findById(data.socialGroupPostId);
    if (!socialGroup) throw new SocialNotFoundException();
    if (!socialGroup.needApprove) throw new DontHaveToRequest();

    const user = await this.userService.findById(data.user.id);
    if (!user) throw new UserNotFoundException();

    const members = await this.findMembersById(socialGroup.id);
    if (socialGroup.admin.id === user.id)
      throw new SocialAdminCantRequestInvite();

    if (members.find((member) => member.user.id === user.id))
      throw new SocialRequestAlreadyExist();

    const joinedUser = await this.socialGroupUserRepository.save({
      socialGroup: { id: socialGroup.id },
      user: { id: user.id },
      userStatus: SocialGroupMemberStatus.WAITING,
      userRole: SocialGroupMemberRole.MEMBER,
    });

    return !!joinedUser;
  }

  async joinSocial(data: {
    socialGroupPostId: string;
    user: UserProfileCommand;
  }): Promise<boolean> {
    const socialGroup = await this.findById(data.socialGroupPostId);
    if (!socialGroup) throw new SocialNotFoundException();
    if (socialGroup.needApprove) throw new HaveToRequestJoin();

    const user = await this.userService.findById(data.user.id);
    if (!user) throw new UserNotFoundException();

    const users = await this.socialGroupUserRepository.count({
      where: {
        socialGroup: { id: socialGroup.id },
        user: { id: user.id },
      },
    });
    if (users > 0) throw new SocialRequestAlreadyExist();

    const joinedUser = await this.addMemberToSocialGroup(
      socialGroup,
      user,
      SocialGroupMemberStatus.JOINED,
    );

    return !!joinedUser;
  }

  async acceptInviteSocial(data: {
    socialGroupPostId: string;
    userId: string;
    user: UserProfileCommand;
  }) {
    const socialGroup = await this.findById(data.socialGroupPostId);
    if (!socialGroup) throw new SocialNotFoundException();

    const admin = await this.userService.findById(data.user.id);
    if (!admin) throw new UserNotFoundException();

    if (socialGroup.admin.id !== admin.id) throw new SocialUserIsNotAdmin();

    const user = await this.userService.findById(data.userId);
    if (!user) throw new UserNotFoundException();

    const joinRequest = await this.socialGroupUserRepository.findOne({
      where: {
        socialGroup: { id: socialGroup.id },
        user: { id: user.id },
        userStatus: SocialGroupMemberStatus.WAITING,
        userRole: SocialGroupMemberRole.MEMBER,
      },
    });
    if (!joinRequest) throw new SocialRequestNotFoundException();

    const { affected } = await this.socialGroupUserRepository.update(
      {
        socialGroup: { id: socialGroup.id },
        user: { id: user.id },
      },
      {
        userStatus: SocialGroupMemberStatus.JOINED,
      },
    );

    return affected > 0;
  }

  async leaveSocial(data: {
    socialGroupPostId: string;
    user: UserProfileCommand;
  }) {
    const socialGroup = await this.findById(data.socialGroupPostId);
    if (!socialGroup) throw new SocialNotFoundException();

    socialGroup.members = await this.findMembersById(socialGroup.id);
    const user = await this.userService.findById(data.user.id);

    const users = await this.socialGroupUserRepository.count({
      where: {
        socialGroup: { id: socialGroup.id },
        user: { id: user.id },
        userStatus:
          SocialGroupMemberStatus.JOINED || SocialGroupMemberStatus.WAITING,
      },
    });
    if (users < 1) throw new SocialCantLeaveAtNotJoin();

    if (
      socialGroup.admin.id === user.id &&
      socialGroup.members.filter(
        (member) =>
          member.userRole !== SocialGroupMemberRole.ADMIN &&
          member.userStatus === SocialGroupMemberStatus.JOINED,
      ).length > 0
    )
      throw new SocialAdminCantLeave();

    await this.socialGroupPostRepository.softDelete({ id: socialGroup.id });
    if (socialGroup.socialGroupPlace) {
      await this.socialGroupPlaceRepository.softDelete({ id: socialGroup.id });
    }
    if (
      socialGroup.members.filter(
        (member) => member.userRole === SocialGroupMemberRole.ADMIN,
      ).length < 2
    ) {
      await this.socialGroupUserRepository.softDelete({ id: socialGroup.id });
    }

    return true;
  }

  async kickSocial(data: {
    socialGroupPostId: string;
    kickUserId: string;
    user: UserProfileCommand;
  }) {
    const socialGroup = await this.findById(data.socialGroupPostId);
    if (!socialGroup) throw new SocialUserNotFoundException();

    const adminUser = await this.userService.findById(data.user.id);
    if (!adminUser) throw new UserNotFoundException();

    const kickUser = await this.userService.findById(data.kickUserId);
    if (!kickUser) throw new UserNotFoundException();

    if (socialGroup.admin.id !== adminUser.id) throw new SocialUserIsNotAdmin();

    const socialGroupJoinedUser = await this.findMemberById(
      socialGroup.id,
      kickUser.id,
      {
        userStatus:
          SocialGroupMemberStatus.JOINED || SocialGroupMemberStatus.WAITING,
      },
    );
    if (socialGroupJoinedUser.userRole === SocialGroupMemberRole.ADMIN)
      throw new SocialCantKickAdmin();
    if (!socialGroupJoinedUser) throw new SocialUserNotFoundException();

    const kickedUser = await this.socialGroupUserRepository.save({
      ...socialGroupJoinedUser,
      socialGroup,
      userStatus: SocialGroupMemberStatus.KICKED,
    });

    return kickedUser.userStatus === SocialGroupMemberStatus.KICKED;
  }

  async updateSocial(
    socialGroupPostId: string,
    userData: UserProfileCommand,
    data: SocialUpdateRequestCommand,
  ): Promise<SocialProfileResponseCommand> {
    const socialGroup = await this.findById(socialGroupPostId);
    if (!socialGroup) throw new SocialNotFoundException();

    const user = await this.userService.findById(userData.id);
    if (!user) throw new UserNotFoundException();

    if (socialGroup.admin.id !== user.id) throw new SocialUserIsNotAdmin();

    const updatedSocialGroup = await this.socialGroupPostRepository.save({
      id: socialGroup.id,
      ...data,
    });
    updatedSocialGroup.members = await this.findMembersById(socialGroupPostId, {
      userStatus: SocialGroupMemberStatus.JOINED,
    });

    return new SocialProfileResponse({
      ...socialGroup,
      members: socialGroup.members.map(
        (member) =>
          new SocialMemberProfileResponse({ ...member, ...member.user }),
      ),
      category: socialGroup.board.category,
    });
  }

  async generateSocialGroup(
    socialGroupBoardId: string,
    socialGroupCreateData: SocialCreateRequestCommand,
    socialGroupAdmin: User,
  ): Promise<SocialGroupPost> {
    const socialGroupBoard = await this.socialBoardService.findById(
      socialGroupBoardId,
    );

    const socialGroup = await this.socialGroupPostRepository.save({
      ...socialGroupCreateData,
      board: socialGroupBoard,
      admin: socialGroupAdmin,
      members: [
        {
          user: socialGroupAdmin,
          userStatus: SocialGroupMemberStatus.JOINED,
          userRole: SocialGroupMemberRole.ADMIN,
        },
      ],
    });

    await this.socialGroupUserRepository.save({
      user: socialGroupAdmin,
      socialGroup,
      userStatus: SocialGroupMemberStatus.JOINED,
      userRole: SocialGroupMemberRole.ADMIN,
    });

    return socialGroup;
  }

  async addMemberToSocialGroup(
    socialGroup: SocialGroupPost,
    user: User,
    userStatus: SocialGroupMemberStatus,
  ): Promise<SocialGroupUser> {
    return await this.socialGroupUserRepository.save({
      user,
      socialGroup,
      userStatus,
      userRole: SocialGroupMemberRole.MEMBER,
    });
  }

  async findById(
    id: string,
    relations?: FindOptionsRelations<SocialGroupPost>,
  ): Promise<SocialGroupPost> {
    return await this.socialGroupPostRepository.findOne({
      where: { id },
      relations: ['admin', 'board'],
    });
  }

  async findMemberById(
    socialGroupPostId: string,
    memberId: string,
    whereOptions?: FindOptionsWhere<SocialGroupUser>,
  ): Promise<SocialGroupUser> {
    return await this.socialGroupUserRepository.findOne({
      where: {
        socialGroup: { id: socialGroupPostId },
        user: { id: memberId },
        ...whereOptions,
      },
      relations: ['user'],
    });
  }

  async findMembersById(
    id: string,
    whereOptions?: FindOptionsWhere<SocialGroupUser>,
  ): Promise<SocialGroupUser[]> {
    return await this.socialGroupUserRepository.find({
      where: { socialGroup: { id }, ...whereOptions },
      relations: ['user'],
    });
  }
}
