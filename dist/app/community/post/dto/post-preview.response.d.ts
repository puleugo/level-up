import { PostPreviewResponseCommand } from '@app/community/post/commands/post.command';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';
import { SocialGroupType } from '@domain/social/social-group';
export declare class PostPreviewResponse implements PostPreviewResponseCommand {
    id: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
    author: UserProfileResponse;
    category: SocialGroupType[];
    createdAt: Date;
    constructor(post: PostPreviewResponseCommand);
}
