import { BoardUpdateRequestCommand } from '@app/community/board/board.commands';

export class BoardUpdateRequest implements BoardUpdateRequestCommand {
  title: string;
  description: string | null;

  constructor(board: BoardUpdateRequestCommand) {
    Object.assign(this, board);
  }
}
