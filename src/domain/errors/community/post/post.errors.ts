import { NotFoundException } from '@nestjs/common';

export const POST_ERRORS = {
  POST_NOT_FOUND: 'POST_NOT_FOUND',
};

export class PostNotFoundException extends NotFoundException {
  constructor() {
    super('존재하지 않는 게시글입니다.', POST_ERRORS.POST_NOT_FOUND);
  }
}
