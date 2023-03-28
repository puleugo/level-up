import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { PostCreateRequestCommand } from '@app/community/post/commands/post.command';

export class PostCreateRequest implements PostCreateRequestCommand {
  @ApiProperty({ example: '게시글 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '게시글 내용' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
