import { SocialGroupType } from '@domain/social/social-group';
import { SocialGroupPost } from '@domain/social/social-group.entity';
export declare class SocialGroupBoard {
    id: string;
    category: SocialGroupType;
    description: string | null;
    socialGroupPosts: SocialGroupPost[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
