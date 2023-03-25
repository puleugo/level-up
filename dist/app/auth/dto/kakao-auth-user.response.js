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
exports.KakaoAuthUserResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class KakaoAuthUserResponse {
    constructor(data) {
        Object.assign(this, data);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 고유번호',
    }),
    __metadata("design:type", Number)
], KakaoAuthUserResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '자동 연결 설정을 비활성화한 경우만 존재',
    }),
    __metadata("design:type", Boolean)
], KakaoAuthUserResponse.prototype, "has_signed_up", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '서비스에 연결 완료된 시각, UTC',
    }),
    __metadata("design:type", Date)
], KakaoAuthUserResponse.prototype, "connected_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카카오싱크 간편가입을 통해 로그인한 시각, UTC',
    }),
    __metadata("design:type", Date)
], KakaoAuthUserResponse.prototype, "synched_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 프로퍼티(Property) 사용자 프로퍼티 참고',
    }),
    __metadata("design:type", Object)
], KakaoAuthUserResponse.prototype, "properties", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 카카오계정 정보',
    }),
    __metadata("design:type", Object)
], KakaoAuthUserResponse.prototype, "kakao_account", void 0);
exports.KakaoAuthUserResponse = KakaoAuthUserResponse;
//# sourceMappingURL=kakao-auth-user.response.js.map