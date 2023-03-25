import { SocialRecruitmentConditions } from '@domain/social/social-group';
import { SocialGroupPost } from '@domain/social/social-group.entity';
export declare class SocialGroupRecruitmentConditions implements SocialRecruitmentConditions {
    id: string;
    maxAge: number;
    minAge: number;
    onlyFemale: boolean;
    onlyMale: boolean;
    socialGroupPost: SocialGroupPost;
}
