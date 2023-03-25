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
exports.SocialGroupBoardController = void 0;
const common_1 = require("@nestjs/common");
const social_group_board_create_request_1 = require("./dto/social-group-board-create.request");
const social_group_board_profile_response_1 = require("./dto/social-group-board-profile.response");
const social_group_board_update_request_1 = require("./dto/social-group-board-update.request");
const social_group_board_service_1 = require("./social-group-board.service");
let SocialGroupBoardController = class SocialGroupBoardController {
    constructor(socialBoardService) {
        this.socialBoardService = socialBoardService;
    }
    async getSocialGroupBoards() {
        const socialGroupBoards = await this.socialBoardService.getSocialGroupBoards();
        return socialGroupBoards.map((board) => {
            return new social_group_board_profile_response_1.SocialGroupBoardProfileResponse(board);
        });
    }
    async createSocialGroupBoard(data) {
        return await this.socialBoardService.createSocialGroupBoard(data);
    }
    async updateSocialGroupBoard(socialGroupBoardId, data) {
        const socialGroupBoard = await this.socialBoardService.updateSocialGroupBoard({
            socialGroupBoardId,
            data,
        });
        return new social_group_board_profile_response_1.SocialGroupBoardProfileResponse(socialGroupBoard);
    }
    async deleteSocialGroupBoard(socialGroupBoardId) {
        return await this.socialBoardService.deleteSocialGroupBoard({
            socialGroupBoardId,
        });
    }
};
__decorate([
    (0, common_1.Get)('social-group-boards'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SocialGroupBoardController.prototype, "getSocialGroupBoards", null);
__decorate([
    (0, common_1.Post)('social-group-boards'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [social_group_board_create_request_1.SocialGroupBoardCreateRequest]),
    __metadata("design:returntype", Promise)
], SocialGroupBoardController.prototype, "createSocialGroupBoard", null);
__decorate([
    (0, common_1.Patch)('social-group-boards/:socialGroupBoardId'),
    __param(0, (0, common_1.Param)('socialGroupBoardId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, social_group_board_update_request_1.SocialGroupBoardUpdateRequest]),
    __metadata("design:returntype", Promise)
], SocialGroupBoardController.prototype, "updateSocialGroupBoard", null);
__decorate([
    (0, common_1.Delete)('social-group-boards/:socialGroupBoardId'),
    __param(0, (0, common_1.Param)('socialGroupBoardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialGroupBoardController.prototype, "deleteSocialGroupBoard", null);
SocialGroupBoardController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [social_group_board_service_1.SocialGroupBoardService])
], SocialGroupBoardController);
exports.SocialGroupBoardController = SocialGroupBoardController;
//# sourceMappingURL=social-group-board.controller.js.map