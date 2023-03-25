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
exports.Todo = void 0;
const typeorm_1 = require("typeorm");
const memoir_entity_1 = require("../post/memoir.entity");
const post_entity_1 = require("../post/post.entity");
const team_entity_1 = require("../team/team.entity");
const todo_1 = require("./todo");
const todo_task_entity_1 = require("./todo-task.entity");
const user_entity_1 = require("./user.entity");
let Todo = class Todo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'int' }),
    __metadata("design:type", Number)
], Todo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Todo.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Todo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Todo.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Todo.prototype, "teamId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: todo_1.TodoStatus, default: todo_1.TodoStatus.BEFORE_START }),
    __metadata("design:type", String)
], Todo.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.toDos, {
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.User)
], Todo.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.toDo),
    __metadata("design:type", Array)
], Todo.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, (team) => team, {
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'teamId', referencedColumnName: 'id' }),
    __metadata("design:type", team_entity_1.Team)
], Todo.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Todo.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Todo.prototype, "endedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => memoir_entity_1.Memoir, (memoir) => memoir.toDo),
    __metadata("design:type", Array)
], Todo.prototype, "memoirs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todo_task_entity_1.TodoTask, (task) => task.todo),
    __metadata("design:type", Array)
], Todo.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Todo.prototype, "repeatDay", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Todo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Todo.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Todo.prototype, "deletedAt", void 0);
Todo = __decorate([
    (0, typeorm_1.Entity)('todos'),
    (0, typeorm_1.Index)(['userId', 'teamId'])
], Todo);
exports.Todo = Todo;
//# sourceMappingURL=todo.entity.js.map