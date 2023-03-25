import { PostCommentUpdateRequestCommand } from '@app/community/comment/commands';

export class PostCommentUpdateRequest
  implements PostCommentUpdateRequestCommand
{
  content: string;
}
