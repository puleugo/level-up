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
exports.SocialGroupPlace = void 0;
const typeorm_1 = require("typeorm");
const social_group_entity_1 = require("./social-group.entity");
let SocialGroupPlace = class SocialGroupPlace {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SocialGroupPlace.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => social_group_entity_1.SocialGroupPost, (socialGroupPost) => socialGroupPost.socialGroupPlace, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", social_group_entity_1.SocialGroupPost)
], SocialGroupPlace.prototype, "socialGroup", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SocialGroupPlace.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SocialGroupPlace.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SocialGroupPlace.prototype, "placeAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SocialGroupPlace.prototype, "region1DepthName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SocialGroupPlace.prototype, "region2DepthName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SocialGroupPlace.prototype, "region3DepthName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SocialGroupPlace.prototype, "buildingName", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SocialGroupPlace.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SocialGroupPlace.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], SocialGroupPlace.prototype, "deletedAt", void 0);
SocialGroupPlace = __decorate([
    (0, typeorm_1.Entity)('social_groups_place')
], SocialGroupPlace);
exports.SocialGroupPlace = SocialGroupPlace;
//# sourceMappingURL=social-group-place.entity.js.map