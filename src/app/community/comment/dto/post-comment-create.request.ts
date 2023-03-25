import { PostCommentCreateRequestCommand } from '@app/community/comment/commands';

export class PostCommentCreateRequest
  implements PostCommentCreateRequestCommand
{
  content: string;
}
