import { SocialGroupBoardProfileResponseCommand } from '@app/social/social-board/commands/social-group-board.commands';
import { SocialGroupType } from '@domain/social/social-group';
export declare class SocialGroupBoardProfileResponse implements SocialGroupBoardProfileResponseCommand {
    id: string;
    category: SocialGroupType;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    constructor(socialGroupBoard: SocialGroupBoardProfileResponseCommand);
}
