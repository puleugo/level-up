import { UserProfileCommand } from '@app/user/user.commands';
import { PostComment } from '@domain/community/comment/post-comment.entity';

export type PostCommentProfileResponseCommand = Pick<
  PostComment,
  'id' | 'content' | 'createdAt' | 'updatedAt' | 'parentCommentId' | 'postId'
> & { author: UserProfileCommand };

export type PostCommentCreateRequestCommand = Pick<PostComment, 'content'>;

export type PostCommentUpdateRequestCommand =
  Partial<PostCommentCreateRequestCommand>;
