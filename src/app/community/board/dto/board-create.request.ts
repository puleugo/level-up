import { BoardCreateRequestCommand } from '@app/community/board/board.commands';
import { PostType } from '@domain/community/post/post';

export class BoardCreateRequest implements BoardCreateRequestCommand {
  title: PostType;
  description: string | null;
}
