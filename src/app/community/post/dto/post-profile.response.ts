import { PostProfileResponseCommand } from '@app/community/post/commands/post.command';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';
import { SocialGroupType } from '@domain/social/social-group';

export class PostProfileResponse implements PostProfileResponseCommand {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  category: SocialGroupType[];
  author: UserProfileResponse;
  createdAt: Date;

  constructor(post: PostProfileResponseCommand) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.likeCount = post.likeCount;
    this.commentCount = post.commentCount;
    this.category = post.category;
    this.createdAt = post.createdAt;
    this.author = new UserProfileResponse(post.author);
  }
}
