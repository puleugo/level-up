import { SocialCreateRequestCommand, SocialPlaceCreateRequestCommand } from '@app/social/social-post/commands/social.commands';
import { SocialRecruitmentConditionCreateRequest } from '@app/social/social-post/dto/social-recruitment-condition-create.request';
export declare class SocialCreateRequest implements SocialCreateRequestCommand {
    title: string;
    content: string;
    recruitment: number;
    recruitmentConditions: SocialRecruitmentConditionCreateRequest;
    thumbnailUrl: string | null;
    needApprove: boolean;
    endAt: Date;
    isOffline: boolean;
    socialPlace?: SocialPlaceCreateRequestCommand;
    socialAt: Date;
}
