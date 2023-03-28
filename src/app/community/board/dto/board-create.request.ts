import { ApiProperty } from '@nestjs/swagger';

import { BoardCreateRequestCommand } from '@app/community/board/board.commands';

export class BoardCreateRequest implements BoardCreateRequestCommand {
  @ApiProperty({ example: '주제1', description: '게시판 주제' })
  topic: string;

  @ApiProperty({ example: '게시판 설명', nullable: true })
  description: string | null;
}
