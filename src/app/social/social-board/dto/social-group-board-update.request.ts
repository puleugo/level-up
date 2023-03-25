import { SocialGroupBoardUpdateRequestCommand } from '@app/social/social-board/commands/social-group-board.commands';
import { SocialGroupType } from '@domain/social/social-group';

export class SocialGroupBoardUpdateRequest
  implements SocialGroupBoardUpdateRequestCommand
{
  category?: SocialGroupType;
  description?: string;
}
