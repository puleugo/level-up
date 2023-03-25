"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_controller_1 = require("./todo.controller");
const todo_service_1 = require("./todo.service");
const todo_alarm_service_1 = require("./todo-alarm.service");
const user_module_1 = require("../user/user.module");
const mission_entity_1 = require("../../domain/todo/mission.entity");
const todo_entity_1 = require("../../domain/todo/todo.entity");
let TodoModule = class TodoModule {
};
TodoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([mission_entity_1.Mission, todo_entity_1.Todo]), user_module_1.UserModule],
        controllers: [todo_controller_1.TodoController],
        providers: [todo_service_1.TodoService, todo_alarm_service_1.TodoAlarmService],
    })
], TodoModule);
exports.TodoModule = TodoModule;
//# sourceMappingURL=todo.module.js.map