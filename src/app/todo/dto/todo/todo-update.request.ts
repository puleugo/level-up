import { ApiProperty } from '@nestjs/swagger';

import { TodoUpdateRequestCommand } from '@app/todo/command/todo.command';
import { TodoStatus } from '@domain/todo/todo';

export class TodoUpdateRequest implements TodoUpdateRequestCommand {
  @ApiProperty({
    example: '할일 제목',
    description: '할일 제목',
    nullable: true,
  })
  title?: string;

  @ApiProperty({
    example: '할일 내용',
    description: '할일 내용',
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    example: 'BEFORE_START',
    description: '할일 상태',
    nullable: true,
  })
  status?: TodoStatus;
}
