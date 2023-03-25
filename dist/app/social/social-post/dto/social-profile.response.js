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
exports.SocialProfileResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const social_member_profile_response_1 = require("./social-member-profile.response");
const social_group_1 = require("../../../../domain/social/social-group");
class SocialProfileResponse {
    constructor(social) {
        Object.assign(this, social);
        this.type = social.category;
        this.members = social.members.map((member) => {
            return new social_member_profile_response_1.SocialMemberProfileResponse(member);
        });
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소셜그룹 아이디' }),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], SocialProfileResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소셜그룹 제목' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialProfileResponse.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '소셜 카테고리',
        enum: social_group_1.SocialGroupType,
    }),
    (0, class_validator_1.IsEnum)(social_group_1.SocialGroupType),
    __metadata("design:type", String)
], SocialProfileResponse.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '썸네일 링크' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialProfileResponse.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '좋아요 수' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SocialProfileResponse.prototype, "likeCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '현재 참여자 수' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SocialProfileResponse.prototype, "memberCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소셜그룹 관리자' }),
    __metadata("design:type", Object)
], SocialProfileResponse.prototype, "admin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '모집 마감' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SocialProfileResponse.prototype, "endAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소셜 시작일' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SocialProfileResponse.prototype, "socialAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '참여 신청제 여부' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SocialProfileResponse.prototype, "needApprove", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '오프라인 여부' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SocialProfileResponse.prototype, "isOffline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소셜링 모집 지역' }),
    __metadata("design:type", Object)
], SocialProfileResponse.prototype, "socialPlace", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소셜그룹 소개' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SocialProfileResponse.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '소셜 모집 제한',
    }),
    __metadata("design:type", Object)
], SocialProfileResponse.prototype, "recruitmentConditions", void 0);
exports.SocialProfileResponse = SocialProfileResponse;
//# sourceMappingURL=social-profile.response.js.map