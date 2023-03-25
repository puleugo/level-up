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
exports.SocialUpdateRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const social_group_1 = require("../../../../domain/social/social-group");
const social_group_place_entity_1 = require("../../../../domain/social/social-group-place.entity");
const social_group_recruitment_conditions_entity_1 = require("../../../../domain/social/social-group-recruitment-conditions.entity");
class SocialUpdateRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '소셜 그룹 이름',
    }),
    __metadata("design:type", String)
], SocialUpdateRequest.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '소셜 그룹 내용',
    }),
    __metadata("design:type", String)
], SocialUpdateRequest.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12,
    }),
    __metadata("design:type", Number)
], SocialUpdateRequest.prototype, "recruitment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: social_group_1.SocialGroupType,
        example: social_group_1.SocialGroupType.DANCE,
    }),
    __metadata("design:type", String)
], SocialUpdateRequest.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            maxAge: 50,
            minAge: 20,
            onlyMale: false,
            onlyFemale: false,
        },
    }),
    __metadata("design:type", social_group_recruitment_conditions_entity_1.SocialGroupRecruitmentConditions)
], SocialUpdateRequest.prototype, "recruitmentConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://thumbnail.url',
    }),
    __metadata("design:type", String)
], SocialUpdateRequest.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
    }),
    __metadata("design:type", Boolean)
], SocialUpdateRequest.prototype, "needApprove", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: new Date(),
    }),
    __metadata("design:type", Date)
], SocialUpdateRequest.prototype, "endAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            buildingName: '빌딩 이름',
            latitude: 37.123456,
            longitude: 127.123456,
            placeAddress: '상세 주소',
            region1DepthName: '시/도',
            region2DepthName: '시/군/구',
            region3DepthName: '동/읍/면',
        },
    }),
    __metadata("design:type", social_group_place_entity_1.SocialGroupPlace)
], SocialUpdateRequest.prototype, "socialPlace", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
    }),
    __metadata("design:type", Boolean)
], SocialUpdateRequest.prototype, "isOffline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: new Date(),
    }),
    __metadata("design:type", Date)
], SocialUpdateRequest.prototype, "socialAt", void 0);
exports.SocialUpdateRequest = SocialUpdateRequest;
//# sourceMappingURL=social-update.request.js.map