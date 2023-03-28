import { ApiProperty } from '@nestjs/swagger';

import { PostCommentCreateRequestCommand } from '@app/community/comment/commands';

export class PostCommentCreateRequest
  implements PostCommentCreateRequestCommand
{
  @ApiProperty({ example: '댓글 내용입니다.' })
  content: string;
}
