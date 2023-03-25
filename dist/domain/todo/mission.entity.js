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
exports.Mission = void 0;
const typeorm_1 = require("typeorm");
const memoir_entity_1 = require("../post/memoir.entity");
const team_entity_1 = require("../team/team.entity");
const mission_1 = require("./mission");
const todo_entity_1 = require("./todo.entity");
const user_entity_1 = require("../user/user.entity");
let Mission = class Mission {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'int' }),
    __metadata("design:type", Number)
], Mission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Mission.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mission.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Mission.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Mission.prototype, "teamId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: mission_1.MissionStatus,
        default: mission_1.MissionStatus.BEFORE_START,
    }),
    __metadata("design:type", String)
], Mission.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.missions, {
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.User)
], Mission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, (team) => team, {
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'teamId', referencedColumnName: 'id' }),
    __metadata("design:type", team_entity_1.Team)
], Mission.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Mission.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Mission.prototype, "endedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], Mission.prototype, "repeatDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Mission.prototype, "alarmAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => memoir_entity_1.Memoir, (memoir) => memoir.mission),
    __metadata("design:type", Array)
], Mission.prototype, "memoirs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todo_entity_1.Todo, (task) => task.mission),
    __metadata("design:type", Array)
], Mission.prototype, "todos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Mission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Mission.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Mission.prototype, "deletedAt", void 0);
Mission = __decorate([
    (0, typeorm_1.Entity)('missions'),
    (0, typeorm_1.Index)(['userId', 'teamId'])
], Mission);
exports.Mission = Mission;
//# sourceMappingURL=mission.entity.js.map