import { Board } from '@domain/post/board.entity';

export type BoardProfileResponseCommand = Pick<
  Board,
  'id' | 'title' | 'description'
>;

export type BoardCreateRequestCommand = Pick<Board, 'title' | 'description'>;

export type BoardUpdateRequestCommand = BoardCreateRequestCommand;
