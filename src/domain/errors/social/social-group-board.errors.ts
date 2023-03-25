import { NotFoundException } from '@nestjs/common';

export const SOCIAL_GROUP_BOARD_ERRORS = {
  SOCIAL_GROUP_BOARD_NOT_FOUND: 'SOCIAL_GROUP_BOARD_NOT_FOUND',
  SOCIAL_GROUP_BOARD_ALREADY_EXISTS: 'SOCIAL_GROUP_BOARD_ALREADY_EXISTS',
};

export class SocialGroupBoardNotFoundException extends NotFoundException {
  constructor() {
    super(
      '존재하지 않는 게시판입니다.',
      SOCIAL_GROUP_BOARD_ERRORS.SOCIAL_GROUP_BOARD_NOT_FOUND,
    );
  }
}

export class SocialGroupBoardAlreadyExistsException extends NotFoundException {
  constructor() {
    super(
      '이미 존재하는 게시판입니다.',
      SOCIAL_GROUP_BOARD_ERRORS.SOCIAL_GROUP_BOARD_ALREADY_EXISTS,
    );
  }
}
