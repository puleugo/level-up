import { SocialMemberProfileCommand } from '@app/user/user.commands';
import { SocialGroupPlaceProperties, SocialGroupProperties } from '@domain/social/social-group';
import { SocialGroupBoard } from '@domain/social/social-group-board.entity';
import { SocialGroupRecruitmentConditions } from '@domain/social/social-group-recruitment-conditions.entity';
export type SocialGroupBoardInfo = {
    socialGroupBoardId: string;
};
export type SocialGroupPostInfo = {
    socialGroupPostId: string;
};
export type getSocialProfileCommand = SocialGroupPostInfo;
export type SocialPlaceCreateRequestCommand = Pick<SocialGroupPlaceProperties, 'buildingName' | 'latitude' | 'longitude' | 'placeAddress' | 'region1DepthName' | 'region2DepthName' | 'region3DepthName'>;
export type SocialListQuery = {
    page: number;
    limit: number;
} & SocialGroupBoardInfo;
export type SocialPreviewResponseCommand = Pick<SocialGroupProperties, 'id' | 'title' | 'admin' | 'endAt' | 'thumbnailUrl' | 'likeCount' | 'memberCount' | 'socialAt'> & Pick<SocialGroupBoard, 'category'> & Partial<Pick<SocialGroupPlaceProperties, 'region3DepthName'>>;
export type SocialProfileResponseCommand = Pick<SocialGroupProperties, 'id' | 'title' | 'thumbnailUrl' | 'likeCount' | 'memberCount' | 'endAt' | 'socialAt' | 'needApprove' | 'isOffline' | 'socialPlace' | 'admin' | 'recruitmentConditions'> & Pick<SocialGroupBoard, 'category'> & {
    members: SocialMemberProfileCommand[];
};
export type SocialCreateRequestCommand = Pick<SocialGroupProperties, 'title' | 'content' | 'recruitment' | 'thumbnailUrl' | 'needApprove' | 'endAt' | 'isOffline' | 'socialAt'> & {
    socialPlace?: SocialPlaceCreateRequestCommand;
} & Partial<SocialGroupRecruitmentConditions>;
export type SocialUpdateRequestCommand = Partial<SocialCreateRequestCommand>;
export type SocialGroups = {
    socialGroups: {
        hostedSocialGroups: SocialProfileResponseCommand[];
        endedSocialGroups: SocialProfileResponseCommand[];
        ongoingSocialGroups: SocialProfileResponseCommand[];
    };
};
