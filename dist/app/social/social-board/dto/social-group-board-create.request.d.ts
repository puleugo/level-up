import { SocialGroupBoardCreateRequestCommand } from '@app/social/social-board/commands/social-group-board.commands';
import { SocialGroupType } from '@domain/social/social-group';
export declare class SocialGroupBoardCreateRequest implements SocialGroupBoardCreateRequestCommand {
    category: SocialGroupType;
    description?: string;
}
