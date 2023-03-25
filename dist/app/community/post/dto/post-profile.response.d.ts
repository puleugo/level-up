import { PostProfileResponseCommand } from '@app/community/post/commands/post.command';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';
import { SocialGroupType } from '@domain/social/social-group';
export declare class PostProfileResponse implements PostProfileResponseCommand {
    id: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
    category: SocialGroupType[];
    author: UserProfileResponse;
    createdAt: Date;
    constructor(post: PostProfileResponseCommand);
}
