import { SocialMemberProfileCommand } from '@app/user/user.commands';
import { SocialGroupMemberRole, SocialGroupMemberStatus } from '@domain/social/social-group';
export declare class SocialMemberProfileResponse implements SocialMemberProfileCommand {
    id: string;
    nickname: string;
    profileImageUrl: string;
    userStatus: SocialGroupMemberStatus;
    userRole: SocialGroupMemberRole;
    constructor(data: SocialMemberProfileCommand);
}
