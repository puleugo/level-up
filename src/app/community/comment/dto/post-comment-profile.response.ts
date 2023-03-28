import { ApiProperty } from '@nestjs/swagger';

import { PostCommentProfileResponseCommand } from '@app/community/comment/commands';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';

export class PostCommentProfileResponse
  implements PostCommentProfileResponseCommand
{
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '댓글 내용' })
  content: string;

  @ApiProperty({ example: 2 })
  postId: number;

  @ApiProperty({ example: 2 })
  parentCommentId: number | null;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;

  @ApiProperty({ example: UserProfileResponse })
  author: UserProfileResponse;

  constructor({
    id,
    content,
    author,
    postId,
    parentCommentId,
    createdAt,
    updatedAt,
  }: PostCommentProfileResponseCommand) {
    this.id = id;
    this.content = content;
    this.author = new UserProfileResponse({ ...author });
    this.postId = postId;
    this.parentCommentId = parentCommentId ? parentCommentId : null;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
