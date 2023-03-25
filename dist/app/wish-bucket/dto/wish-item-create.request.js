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
exports.WishItemCreateRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
class WishItemCreateRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '위시 아이템 제목',
    }),
    __metadata("design:type", String)
], WishItemCreateRequest.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '위시 아이템 가격',
    }),
    __metadata("design:type", Number)
], WishItemCreateRequest.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '위시 아이템 이미지 URL',
    }),
    __metadata("design:type", String)
], WishItemCreateRequest.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '위시 아이템 URL',
    }),
    __metadata("design:type", String)
], WishItemCreateRequest.prototype, "url", void 0);
exports.WishItemCreateRequest = WishItemCreateRequest;
//# sourceMappingURL=wish-item-create.request.js.map