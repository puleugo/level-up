import { ApiProperty } from '@nestjs/swagger';

import { TodoCreateRequestCommand } from '@app/todo/command/todo.command';

export class TodoCreateRequest implements TodoCreateRequestCommand {
  @ApiProperty({ example: '할일 제목', description: '할일 제목' })
  title: string;

  @ApiProperty({
    example: '할일 내용',
    description: '할일 내용',
    nullable: true,
  })
  description?: string;
}
