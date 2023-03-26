import { BoardProfileResponseCommand } from '@app/community/board/board.commands';

export class BoardProfileResponse implements BoardProfileResponseCommand {
  id: string;
  title: string;
  description: string | null;

  constructor(board: BoardProfileResponseCommand) {
    this.id = board.id;
    this.title = board.title;
    this.description = board.description;
  }
}
