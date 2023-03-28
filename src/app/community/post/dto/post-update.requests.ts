import { ApiProperty } from '@nestjs/swagger';

import { PostUpdateRequestCommand } from '@app/community/post/commands/post.command';

export class PostUpdateRequest implements PostUpdateRequestCommand {
  @ApiProperty({ example: '업데이트된 제목' })
  title: string;
  @ApiProperty({ example: '업데이트된 내용' })
  content: string;
}
