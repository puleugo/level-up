import { Board } from '@domain/community/board/board.entity';

export type BoardProfileResponseCommand = Pick<
  Board,
  'id' | 'title' | 'description'
>;

export type BoardCreateRequestCommand = Pick<Board, 'title' | 'description'>;

export type BoardUpdateRequestCommand = BoardCreateRequestCommand;
