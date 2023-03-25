import { SocialGroupReportEnum, SocialGroupReportProperties } from '@domain/social/social-group';
import { SocialGroupReportLogs } from '@domain/social/social-group-report-logs.entity';
export declare class SocialGroupReports implements SocialGroupReportProperties {
    id: string;
    SocialGroupReport: SocialGroupReportEnum;
    socialGroupReportLog: SocialGroupReportLogs;
}
