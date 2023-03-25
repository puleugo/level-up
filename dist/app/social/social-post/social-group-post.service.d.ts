import { Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { SocialGroupBoardService } from '@app/social/social-board/social-group-board.service';
import { getSocialProfileCommand, SocialCreateRequestCommand, SocialListQuery, SocialProfileResponseCommand, SocialUpdateRequestCommand } from '@app/social/social-post/commands/social.commands';
import { SocialPreviewResponse } from '@app/social/social-post/dto/social-preview.response';
import { UserProfileCommand } from '@app/user/user.commands';
import { UserService } from '@app/user/user.service';
import { SocialGroupMemberStatus } from '@domain/social/social-group';
import { SocialGroupPlace } from '@domain/social/social-group-place.entity';
import { SocialGroupUser } from '@domain/social/social-group-user.entity';
import { SocialGroupPost } from '@domain/social/social-group.entity';
import { User } from '@domain/user/user.entity';
export declare class SocialGroupPostService {
    private readonly socialGroupPostRepository;
    private readonly socialGroupUserRepository;
    private readonly socialGroupPlaceRepository;
    private readonly userRepository;
    private readonly userService;
    private readonly socialBoardService;
    constructor(socialGroupPostRepository: Repository<SocialGroupPost>, socialGroupUserRepository: Repository<SocialGroupUser>, socialGroupPlaceRepository: Repository<SocialGroupPlace>, userRepository: Repository<User>, userService: UserService, socialBoardService: SocialGroupBoardService);
    getSocials(data: SocialListQuery): Promise<Pagination<SocialPreviewResponse>>;
    getSocialProfile(data: getSocialProfileCommand): Promise<SocialProfileResponseCommand>;
    getSocialInviteRequestList(data: {
        socialGroupPostId: string;
        admin: UserProfileCommand;
    }): Promise<SocialGroupUser[]>;
    createSocial(data: {
        socialGroupBoardId: string;
        data: SocialCreateRequestCommand;
        user: UserProfileCommand;
    }): Promise<SocialProfileResponseCommand>;
    requestInviteSocial(data: {
        socialGroupPostId: string;
        user: UserProfileCommand;
    }): Promise<boolean>;
    joinSocial(data: {
        socialGroupPostId: string;
        user: UserProfileCommand;
    }): Promise<boolean>;
    acceptInviteSocial(data: {
        socialGroupPostId: string;
        userId: string;
        user: UserProfileCommand;
    }): Promise<boolean>;
    leaveSocial(data: {
        socialGroupPostId: string;
        user: UserProfileCommand;
    }): Promise<boolean>;
    kickSocial(data: {
        socialGroupPostId: string;
        kickUserId: string;
        user: UserProfileCommand;
    }): Promise<boolean>;
    updateSocial(socialGroupPostId: string, userData: UserProfileCommand, data: SocialUpdateRequestCommand): Promise<SocialProfileResponseCommand>;
    generateSocialGroup(socialGroupBoardId: string, socialGroupCreateData: SocialCreateRequestCommand, socialGroupAdmin: User): Promise<SocialGroupPost>;
    addMemberToSocialGroup(socialGroup: SocialGroupPost, user: User, userStatus: SocialGroupMemberStatus): Promise<SocialGroupUser>;
    findById(id: string, relations?: FindOptionsRelations<SocialGroupPost>): Promise<SocialGroupPost>;
    findMemberById(socialGroupPostId: string, memberId: string, whereOptions?: FindOptionsWhere<SocialGroupUser>): Promise<SocialGroupUser>;
    findMembersById(id: string, whereOptions?: FindOptionsWhere<SocialGroupUser>): Promise<SocialGroupUser[]>;
}
