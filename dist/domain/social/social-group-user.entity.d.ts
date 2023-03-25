import { SocialGroupMemberRole, SocialGroupMembersProperties, SocialGroupMemberStatus } from '@domain/social/social-group';
import { SocialGroupPost } from '@domain/social/social-group.entity';
import { User } from '@domain/user/user.entity';
export declare class SocialGroupUser implements SocialGroupMembersProperties {
    id: string;
    socialGroup: SocialGroupPost;
    user: User;
    userStatus: SocialGroupMemberStatus;
    userRole: SocialGroupMemberRole;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
