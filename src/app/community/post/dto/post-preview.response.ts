import { PostPreviewResponseCommand } from '@app/community/post/commands/post.command';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';
import { SocialGroupType } from '@domain/social/social-group';

export class PostPreviewResponse implements PostPreviewResponseCommand {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  author: UserProfileResponse;
  category: SocialGroupType[];
  createdAt: Date;

  constructor(post: PostPreviewResponseCommand) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.likeCount = post.likeCount;
    this.commentCount = post.commentCount;
    this.author = new UserProfileResponse(post.author);
    this.category = post.category;
    this.createdAt = post.createdAt;
  }
}
