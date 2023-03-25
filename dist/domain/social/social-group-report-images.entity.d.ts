import { SocialGroupReportImagesProperties } from '@domain/social/social-group';
import { SocialGroupReportLogs } from '@domain/social/social-group-report-logs.entity';
export declare class SocialGroupReportImages implements SocialGroupReportImagesProperties {
    id: string;
    url: string;
    socialGroupReportLog: SocialGroupReportLogs;
}
