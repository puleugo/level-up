import { PostCommentProfileResponseCommand } from '@app/community/comment/commands';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';
import { Post } from '@domain/community/post/post.entity';

export class PostCommentProfileResponse
  implements PostCommentProfileResponseCommand
{
  id: number;
  content: string;
  author: UserProfileResponse;
  post: Post;
  parentComment: PostCommentProfileResponse | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(comment: PostCommentProfileResponseCommand) {
    this.id = comment.id;
    this.content = comment.content;
    this.author = new UserProfileResponse(comment.author);
    this.post = comment.post;
    this.parentComment = comment.parentComment
      ? new PostCommentProfileResponse(comment.parentComment)
      : null;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }
}
