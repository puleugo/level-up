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
exports.SocialGroupUser = void 0;
const typeorm_1 = require("typeorm");
const social_group_1 = require("./social-group");
const social_group_entity_1 = require("./social-group.entity");
const user_entity_1 = require("../user/user.entity");
let SocialGroupUser = class SocialGroupUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SocialGroupUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => social_group_entity_1.SocialGroupPost, (socialGroupPost) => socialGroupPost),
    __metadata("design:type", social_group_entity_1.SocialGroupPost)
], SocialGroupUser.prototype, "socialGroup", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user),
    __metadata("design:type", user_entity_1.User)
], SocialGroupUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: social_group_1.SocialGroupMemberStatus }),
    __metadata("design:type", String)
], SocialGroupUser.prototype, "userStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: social_group_1.SocialGroupMemberRole }),
    __metadata("design:type", String)
], SocialGroupUser.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SocialGroupUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SocialGroupUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], SocialGroupUser.prototype, "deletedAt", void 0);
SocialGroupUser = __decorate([
    (0, typeorm_1.Entity)('social_group_users')
], SocialGroupUser);
exports.SocialGroupUser = SocialGroupUser;
//# sourceMappingURL=social-group-user.entity.js.map