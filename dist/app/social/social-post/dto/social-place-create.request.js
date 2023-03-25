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
exports.SocialPlaceCreateRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SocialPlaceCreateRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '건물 이름', nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SocialPlaceCreateRequest.prototype, "buildingName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '위도' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SocialPlaceCreateRequest.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '경도' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SocialPlaceCreateRequest.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '주소' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SocialPlaceCreateRequest.prototype, "placeAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '시/도' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SocialPlaceCreateRequest.prototype, "region1DepthName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '시/군/구' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SocialPlaceCreateRequest.prototype, "region2DepthName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '읍/면/동' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SocialPlaceCreateRequest.prototype, "region3DepthName", void 0);
exports.SocialPlaceCreateRequest = SocialPlaceCreateRequest;
//# sourceMappingURL=social-place-create.request.js.map