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
exports.Memoir = void 0;
const typeorm_1 = require("typeorm");
const post_image_entity_1 = require("./post-image.entity");
const mission_entity_1 = require("../todo/mission.entity");
const user_entity_1 = require("../user/user.entity");
let Memoir = class Memoir {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'int' }),
    __metadata("design:type", Number)
], Memoir.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', primary: true }),
    __metadata("design:type", Number)
], Memoir.prototype, "todoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', primary: true }),
    __metadata("design:type", String)
], Memoir.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Memoir.prototype, "logging", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Memoir.prototype, "keep", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Memoir.prototype, "problem", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Memoir.prototype, "try", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mission_entity_1.Mission, (toDo) => toDo.memoirs),
    (0, typeorm_1.JoinColumn)({ name: 'todoId', referencedColumnName: 'id' }),
    __metadata("design:type", mission_entity_1.Mission)
], Memoir.prototype, "mission", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_image_entity_1.PostImage, (memoirImage) => memoirImage.memoir),
    __metadata("design:type", Array)
], Memoir.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.memoirs),
    __metadata("design:type", user_entity_1.User)
], Memoir.prototype, "author", void 0);
Memoir = __decorate([
    (0, typeorm_1.Entity)('memoirs')
], Memoir);
exports.Memoir = Memoir;
//# sourceMappingURL=memoir.entity.js.map