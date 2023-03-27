import { PostPreviewResponseCommand } from '@app/community/post/commands/post.command';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';

export class PostPreviewResponse implements PostPreviewResponseCommand {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  author: UserProfileResponse;
  category: string;
  createdAt: Date;

  constructor({
    id,
    title,
    content,
    likeCount,
    commentCount,
    author,
    createdAt,
  }: PostPreviewResponseCommand) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.likeCount = likeCount;
    this.commentCount = commentCount;
    this.author = new UserProfileResponse(author);
    this.createdAt = createdAt;
  }
}
