import { ApiProperty } from '@nestjs/swagger';

import { BoardProfileResponseCommand } from '@app/community/board/board.commands';

export class BoardProfileResponse implements BoardProfileResponseCommand {
  @ApiProperty({
    example: 1,
    description: '게시판 ID',
  })
  id: number;

  @ApiProperty({
    example: '창작',
    description: '게시판 제목(주제)',
  })
  title: string;

  @ApiProperty({
    example: '자유롭게 글을 쓸 수 있는 게시판입니다.',
  })
  description: string | null;

  constructor({ id, title, description }: BoardProfileResponseCommand) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
