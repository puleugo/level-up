import { NotFoundException } from '@nestjs/common';

export const BOARD_ERRORS = {
  BOARD_NOT_FOUND: 'BOARD_NOT_FOUND',
};

export class BoardNotFoundException extends NotFoundException {
  constructor() {
    super('존재하지 않는 게시판입니다.', BOARD_ERRORS.BOARD_NOT_FOUND);
  }
}
