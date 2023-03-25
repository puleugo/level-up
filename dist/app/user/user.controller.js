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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const todo_alarm_response_1 = require("../todo/dto/mission/todo-alarm.response");
const user_todo_response_1 = require("../todo/dto/mission/user-todo-response");
const user_address_request_1 = require("./dto/user-address.request");
const user_address_response_1 = require("./dto/user-address.response");
const user_profile_detail_response_1 = require("./dto/user-profile-detail.response");
const user_service_1 = require("./user.service");
const auth_errors_1 = require("../../domain/errors/auth.errors");
const user_errors_1 = require("../../domain/errors/user.errors");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async updateUserAddress(address, { user }) {
        const userAddress = await this.userService.updateUserAddress(user.id, address);
        return new user_address_response_1.UserAddressResponse(userAddress);
    }
    async getUserDetailProfile({ user }) {
        const userDetailProfile = await this.userService.getUserDetailProfile({
            userId: user.id,
        });
        return new user_profile_detail_response_1.UserDetailProfileResponse(userDetailProfile);
    }
    async getMyProgress({ user }) {
        const toDos = await this.userService.findProgressById(user.id);
        return toDos.map((todo) => new user_todo_response_1.UserTodoResponse(todo));
    }
    async getMyAlarms({ user }) {
        const alarms = await this.userService.findAlarmsById(user.id);
        return alarms.map((alarm) => new todo_alarm_response_1.MissionAlarmResponse(alarm));
    }
};
__decorate([
    (0, common_1.Patch)('address'),
    (0, swagger_1.ApiOperation)({
        summary: '사용자의 위치 정보를 업데이트합니다.',
        externalDocs: {
            description: '카카오 API: 좌표로 주소 변환하기',
            url: 'https://developers.kakao.com/docs/latest/ko/local/dev-guide#coord-to-address',
        },
    }),
    (0, swagger_1.ApiBody)({ type: user_address_request_1.UserAddressRequest }),
    (0, swagger_1.ApiResponse)({ type: user_address_response_1.UserAddressResponse }),
    (0, swagger_1.ApiNotFoundResponse)({ description: user_errors_1.USER_ERRORS.USER_NOT_FOUND }),
    (0, swagger_1.ApiBadRequestResponse)({ description: auth_errors_1.AUTH_ERRORS.KAKAO_API_FAILED }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_address_request_1.UserAddressRequest, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserAddress", null);
__decorate([
    (0, common_1.Get)('detail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserDetailProfile", null);
__decorate([
    (0, common_1.Get)('progress'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyProgress", null);
__decorate([
    (0, common_1.Get)('alarms'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyAlarms", null);
UserController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('[유저] 계정'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map