import { SocialGroupBoard } from '@domain/social/social-group-board.entity';

export type SocialGroupBoardCreateRequestCommand = Pick<
  SocialGroupBoard,
  'category'
> &
  Partial<Pick<SocialGroupBoard, 'description'>>;

export type SocialGroupBoardUpdateRequestCommand =
  Partial<SocialGroupBoardCreateRequestCommand>;

export type SocialGroupBoardProfileResponseCommand = Pick<
  SocialGroupBoard,
  'id' | 'category' | 'description' | 'createdAt' | 'updatedAt'
>;
