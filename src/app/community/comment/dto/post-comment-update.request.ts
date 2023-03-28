import { ApiProperty } from '@nestjs/swagger';

import { PostCommentUpdateRequestCommand } from '@app/community/comment/commands';

export class PostCommentUpdateRequest
  implements PostCommentUpdateRequestCommand
{
  @ApiProperty({ example: '댓글 내용' })
  content: string;
}
