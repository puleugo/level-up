"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialGroupReports = void 0;
const typeorm_1 = require("typeorm");
const social_group_1 = require("./social-group");
const social_group_report_logs_entity_1 = require("./social-group-report-logs.entity");
let SocialGroupReports = class SocialGroupReports {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SocialGroupReports.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'enum', enum: social_group_1.SocialGroupReportEnum }),
    __metadata("design:type", String)
], SocialGroupReports.prototype, "SocialGroupReport", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => social_group_report_logs_entity_1.SocialGroupReportLogs, (socialGroupReportLog) => socialGroupReportLog),
    __metadata("design:type", social_group_report_logs_entity_1.SocialGroupReportLogs)
], SocialGroupReports.prototype, "socialGroupReportLog", void 0);
SocialGroupReports = __decorate([
    (0, typeorm_1.Entity)('social_group_reports')
], SocialGroupReports);
exports.SocialGroupReports = SocialGroupReports;
//# sourceMappingURL=social-group-reports.entity.js.map