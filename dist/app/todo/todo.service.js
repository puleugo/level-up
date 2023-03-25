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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const mission_entity_1 = require("../../domain/todo/mission.entity");
const todo_entity_1 = require("../../domain/todo/todo.entity");
let TodoService = class TodoService {
    constructor(missionRepository, todoRepository, userService) {
        this.missionRepository = missionRepository;
        this.todoRepository = todoRepository;
        this.userService = userService;
    }
    async getTodosByDate(getTasksByDateRequestQuery) {
        return await this.todoRepository.find({
            where: {
                userId: getTasksByDateRequestQuery.userId,
                startedAt: (0, typeorm_2.MoreThanOrEqual)(getTasksByDateRequestQuery.startCursor),
                endedAt: (0, typeorm_2.LessThan)(getTasksByDateRequestQuery.endCursor),
            },
        });
    }
    async getMission(userId) {
        return await this.missionRepository.find({ where: { userId } });
    }
    async createMission(todoCreateRequest) {
        const user = await this.userService.findById(todoCreateRequest.userId);
        return await this.missionRepository.save(Object.assign(Object.assign({}, todoCreateRequest), { user }));
    }
    async updateMission(todoUpdateRequest) {
        const user = await this.userService.findById(todoUpdateRequest.userId);
        const todo = await this.findById(todoUpdateRequest.id, undefined, {
            userId: user.id,
        });
        return await this.missionRepository.save(Object.assign(Object.assign({}, todo), todoUpdateRequest));
    }
    async deleteMission(data) {
        return await this.missionRepository.softDelete(Object.assign({}, data));
    }
    async getTodosByMissionId(userId, missionId) {
        return await this.todoRepository.find({
            where: { missionId, userId },
        });
    }
    async createTodo(todoTaskCreateRequest) {
        return await this.todoRepository.save(Object.assign({}, todoTaskCreateRequest));
    }
    async updateTodo(todoTaskUpdateRequest) {
        const task = await this.findTodoByMissionId(todoTaskUpdateRequest.id);
        return await this.todoRepository.save(Object.assign(Object.assign({}, task), todoTaskUpdateRequest));
    }
    async deleteTodo(todoTaskDeleteRequest) {
        await this.todoRepository.softDelete(Object.assign({}, todoTaskDeleteRequest));
    }
    async findById(id, relations, where) {
        return await this.missionRepository.findOne({
            where: Object.assign({ id }, where),
            relations,
        });
    }
    async findTodoByMissionId(id, relations, where) {
        return await this.todoRepository.findOne({
            where: Object.assign({ missionId: id }, where),
            relations,
        });
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mission_entity_1.Mission)),
    __param(1, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map