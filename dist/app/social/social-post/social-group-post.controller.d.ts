import { Pagination } from '@app/infrastructure/types/pagination.types';
import { Request } from '@app/infrastructure/types/request.types';
import { SocialCreateRequest } from '@app/social/social-post/dto/social-create.request';
import { SocialMemberProfileResponse } from '@app/social/social-post/dto/social-member-profile.response';
import { SocialPreviewResponse } from '@app/social/social-post/dto/social-preview.response';
import { SocialProfileResponse } from '@app/social/social-post/dto/social-profile.response';
import { SocialUpdateRequest } from '@app/social/social-post/dto/social-update.request';
import { SocialGroupPostService } from '@app/social/social-post/social-group-post.service';
export declare class SocialGroupPostController {
    private readonly socialService;
    constructor(socialService: SocialGroupPostService);
    getSocials(page: number, limit: number, socialGroupBoardId: string): Promise<Pagination<SocialPreviewResponse>>;
    getTopSocials(): Promise<SocialPreviewResponse[]>;
    getSocialProfile(socialGroupPostId: string): Promise<SocialProfileResponse>;
    getSocialInviteRequestList(socialGroupPostId: string, { user }: Request): Promise<SocialMemberProfileResponse[]>;
    joinSocial(socialGroupPostId: string, { user }: Request): Promise<boolean>;
    createSocial(socialGroupBoardId: string, data: SocialCreateRequest, { user }: Request): Promise<SocialProfileResponse>;
    createSocialComment(): Promise<void>;
    requestInviteSocial(socialGroupPostId: string, { user }: Request): Promise<boolean>;
    acceptInviteSocial(socialGroupPostId: string, userId: string, { user }: Request): Promise<boolean>;
    leaveSocial(socialGroupPostId: string, { user }: Request): Promise<boolean>;
    kickSocial(socialGroupPostId: string, kickUserId: string, { user }: Request): Promise<boolean>;
    reportSocial(): Promise<boolean>;
    updateSocial(socialGroupPostId: string, { user }: Request, data: SocialUpdateRequest): Promise<SocialProfileResponse>;
}
