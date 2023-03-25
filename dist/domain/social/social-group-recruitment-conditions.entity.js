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
exports.SocialGroupRecruitmentConditions = void 0;
const typeorm_1 = require("typeorm");
const social_group_entity_1 = require("./social-group.entity");
let SocialGroupRecruitmentConditions = class SocialGroupRecruitmentConditions {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SocialGroupRecruitmentConditions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SocialGroupRecruitmentConditions.prototype, "maxAge", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SocialGroupRecruitmentConditions.prototype, "minAge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], SocialGroupRecruitmentConditions.prototype, "onlyFemale", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], SocialGroupRecruitmentConditions.prototype, "onlyMale", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => social_group_entity_1.SocialGroupPost, (socialGroupPost) => socialGroupPost.recruitmentConditions),
    __metadata("design:type", social_group_entity_1.SocialGroupPost)
], SocialGroupRecruitmentConditions.prototype, "socialGroupPost", void 0);
SocialGroupRecruitmentConditions = __decorate([
    (0, typeorm_1.Entity)('social_recruitment_conditions')
], SocialGroupRecruitmentConditions);
exports.SocialGroupRecruitmentConditions = SocialGroupRecruitmentConditions;
//# sourceMappingURL=social-group-recruitment-conditions.entity.js.map