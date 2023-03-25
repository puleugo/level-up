import { BoardProfileResponseCommand } from '@app/community/board/board.commands';
import { PostType } from '@domain/post/post';

export class BoardProfileResponse implements BoardProfileResponseCommand {
  id: string;
  title: PostType;
  description: string | null;

  constructor(board: BoardProfileResponseCommand) {
    this.id = board.id;
    this.title = board.title;
    this.description = board.description;
  }
}
