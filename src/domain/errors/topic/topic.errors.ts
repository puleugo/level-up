import { NotFoundException } from '@nestjs/common';

export const TOPIC_ERRORS = {
  TOPIC_NOT_FOUND: 'TOPIC_NOT_FOUND',
};

export class TopicNotFoundException extends NotFoundException {
  constructor() {
    super('존재하지 않는 주제명입니다.', TOPIC_ERRORS.TOPIC_NOT_FOUND);
  }
}
