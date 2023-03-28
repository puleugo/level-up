import { Board } from '@domain/community/board/board.entity';
import { Topic } from '@domain/topic/topic.entity';

export type BoardProfileResponseCommand = Pick<
  Board,
  'id' | 'title' | 'description'
>;

export type BoardCreateRequestCommand = Pick<Board, 'description'> &
  Pick<Topic, 'topic'>;

export type BoardUpdateRequestCommand = BoardCreateRequestCommand;
