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
exports.ToDoTask = void 0;
const typeorm_1 = require("typeorm");
const to_do_1 = require("./to-do");
const todo_entity_1 = require("./todo.entity");
const user_entity_1 = require("./user.entity");
let ToDoTask = class ToDoTask {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'int' }),
    __metadata("design:type", Number)
], ToDoTask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ToDoTask.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ToDoTask.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ToDoTask.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ToDoTask.prototype, "todoId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: to_do_1.TodoTaskStatus,
        default: to_do_1.TodoTaskStatus.BEFORE_START,
    }),
    __metadata("design:type", String)
], ToDoTask.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.tasks),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.User)
], ToDoTask.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => todo_entity_1.Todo, (todo) => todo.tasks),
    (0, typeorm_1.JoinColumn)({ name: 'todoId', referencedColumnName: 'id' }),
    __metadata("design:type", todo_entity_1.Todo)
], ToDoTask.prototype, "toDo", void 0);
ToDoTask = __decorate([
    (0, typeorm_1.Entity)('to_do_tasks'),
    (0, typeorm_1.Index)(['userId', 'todoId'])
], ToDoTask);
exports.ToDoTask = ToDoTask;
//# sourceMappingURL=to-do-task.entity.js.map