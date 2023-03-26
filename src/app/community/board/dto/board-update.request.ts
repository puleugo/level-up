import { BoardUpdateRequestCommand } from '@app/community/board/board.commands';
import { PostType } from '@domain/community/post/post';

export class BoardUpdateRequest implements BoardUpdateRequestCommand {
  title: PostType;
  description: string | null;

  constructor(board: BoardUpdateRequestCommand) {
    Object.assign(this, board);
  }
}
