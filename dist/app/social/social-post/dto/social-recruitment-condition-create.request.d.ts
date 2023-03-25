import { SocialGroupRecruitmentConditions } from '@domain/social/social-group-recruitment-conditions.entity';
export declare class SocialRecruitmentConditionCreateRequest implements Partial<SocialGroupRecruitmentConditions> {
    maxAge: number;
    minAge: number;
    onlyFemale: boolean;
    onlyMale: boolean;
}
