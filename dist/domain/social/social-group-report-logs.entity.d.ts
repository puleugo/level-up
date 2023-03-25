import { SocialGroupReportLogsProperties } from '@domain/social/social-group';
import { SocialGroupReportImages } from '@domain/social/social-group-report-images.entity';
import { SocialGroupPost } from '@domain/social/social-group.entity';
import { User } from '@domain/user/user.entity';
export declare class SocialGroupReportLogs implements SocialGroupReportLogsProperties {
    id: string;
    user: User;
    socialGroup: SocialGroupPost;
    reason: string;
    reportImages: SocialGroupReportImages[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
