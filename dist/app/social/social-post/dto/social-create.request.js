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
exports.SocialCreateRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const social_recruitment_condition_create_request_1 = require("./social-recruitment-condition-create.request");
class SocialCreateRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '소셜링 제목' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialCreateRequest.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '소셜링 내용' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialCreateRequest.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: '모집 인원' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SocialCreateRequest.prototype, "recruitment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: social_recruitment_condition_create_request_1.SocialRecruitmentConditionCreateRequest,
        description: '모집 조건',
    }),
    __metadata("design:type", social_recruitment_condition_create_request_1.SocialRecruitmentConditionCreateRequest)
], SocialCreateRequest.prototype, "recruitmentConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://image.com', description: '썸네일 이미지' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], SocialCreateRequest.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소셜링 참여 수락 필요 여부' }),
    __metadata("design:type", Boolean)
], SocialCreateRequest.prototype, "needApprove", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소셜링 모집 마감 시간' }),
    __metadata("design:type", Date)
], SocialCreateRequest.prototype, "endAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '오프라인 여부' }),
    __metadata("design:type", Boolean)
], SocialCreateRequest.prototype, "isOffline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소셜링 장소' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SocialCreateRequest.prototype, "socialPlace", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소셜링 시작 시간' }),
    __metadata("design:type", Date)
], SocialCreateRequest.prototype, "socialAt", void 0);
exports.SocialCreateRequest = SocialCreateRequest;
//# sourceMappingURL=social-create.request.js.map