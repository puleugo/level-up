import { ApiProperty } from '@nestjs/swagger';

import { BoardUpdateRequestCommand } from '@app/community/board/board.commands';

export class BoardUpdateRequest implements BoardUpdateRequestCommand {
  @ApiProperty({ example: '주제2', description: '게시판 주제' })
  topic: string;

  @ApiProperty({ example: '변경된 게시판 설명', description: '게시판 설명' })
  description: string | null;

  constructor({ topic, description }: BoardUpdateRequestCommand) {
    this.topic = topic;
    this.description = description;
  }
}
