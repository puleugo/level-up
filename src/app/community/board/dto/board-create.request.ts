import { BoardCreateRequestCommand } from '@app/community/board/board.commands';

export class BoardCreateRequest implements BoardCreateRequestCommand {
  title: string;
  description: string | null;
}
