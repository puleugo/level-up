import { UserProfileCommand } from '@app/user/user.commands';
import { PostComment } from '@domain/community/comment/post-comment.entity';

export type PostCommentProfileResponseCommand = Pick<
  PostComment,
  'id' | 'content' | 'post' | 'createdAt' | 'updatedAt'
> & { author: UserProfileCommand } & {
  parentComment: PostCommentProfileResponseCommand | null;
};

export type PostCommentCreateRequestCommand = Pick<PostComment, 'content'>;

export type PostCommentUpdateRequestCommand =
  Partial<PostCommentCreateRequestCommand>;
