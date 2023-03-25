import { SocialPreviewResponseCommand } from '@app/social/social-post/commands/social.commands';
import { SocialGroupType } from '@domain/social/social-group';
import { UserProperties } from '@domain/user/user';
export declare class SocialPreviewResponse implements SocialPreviewResponseCommand {
    id: string;
    title: string;
    admin: UserProperties;
    endAt: Date;
    thumbnailUrl: string;
    type: SocialGroupType;
    likeCount: number;
    memberCount: number;
    socialAt: Date;
    region3DepthName: string;
    category: SocialGroupType;
    constructor(date: SocialPreviewResponseCommand);
}
