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
exports.UserDetailProfileResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDetailProfileResponse {
    constructor(data) {
        Object.assign(this, data);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 식별자',
    }),
    __metadata("design:type", String)
], UserDetailProfileResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 아이디',
    }),
    __metadata("design:type", String)
], UserDetailProfileResponse.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 닉네임',
    }),
    __metadata("design:type", String)
], UserDetailProfileResponse.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 매너온도',
    }),
    __metadata("design:type", Number)
], UserDetailProfileResponse.prototype, "mannerTemperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 소개',
    }),
    __metadata("design:type", String)
], UserDetailProfileResponse.prototype, "introduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 프로필 이미지 URL',
        nullable: true,
    }),
    __metadata("design:type", String)
], UserDetailProfileResponse.prototype, "profileImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 팔로잉 수',
    }),
    __metadata("design:type", Number)
], UserDetailProfileResponse.prototype, "followingCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 팔로워 수',
    }),
    __metadata("design:type", Number)
], UserDetailProfileResponse.prototype, "followerCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 관심사',
    }),
    __metadata("design:type", Array)
], UserDetailProfileResponse.prototype, "interests", void 0);
exports.UserDetailProfileResponse = UserDetailProfileResponse;
//# sourceMappingURL=user-profile-detail.response.js.map