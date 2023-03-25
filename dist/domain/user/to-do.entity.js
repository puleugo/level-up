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
exports.ToDo = void 0;
const typeorm_1 = require("typeorm");
const memoir_entity_1 = require("../post/memoir.entity");
const post_entity_1 = require("../post/post.entity");
const team_entity_1 = require("../team/team.entity");
const to_do_1 = require("./to-do");
const to_do_task_entity_1 = require("./to-do-task.entity");
const user_entity_1 = require("./user.entity");
let ToDo = class ToDo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'int' }),
    __metadata("design:type", Number)
], ToDo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ToDo.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ToDo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ToDo.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ToDo.prototype, "teamId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: to_do_1.TodoStatus, default: to_do_1.TodoStatus.BEFORE_START }),
    __metadata("design:type", String)
], ToDo.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.toDos, {
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.User)
], ToDo.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.toDo),
    __metadata("design:type", Array)
], ToDo.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, (team) => team, {
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'teamId', referencedColumnName: 'id' }),
    __metadata("design:type", team_entity_1.Team)
], ToDo.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ToDo.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ToDo.prototype, "endedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => memoir_entity_1.Memoir, (memoir) => memoir.toDo),
    __metadata("design:type", Array)
], ToDo.prototype, "memoirs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => to_do_task_entity_1.ToDoTask, (task) => task.toDo),
    __metadata("design:type", Array)
], ToDo.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ToDo.prototype, "repeatDay", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ToDo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ToDo.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ToDo.prototype, "deletedAt", void 0);
ToDo = __decorate([
    (0, typeorm_1.Entity)('to_dos'),
    (0, typeorm_1.Index)(['userId', 'teamId'])
], ToDo);
exports.ToDo = ToDo;
//# sourceMappingURL=to-do.entity.js.map