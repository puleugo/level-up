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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const board_service_1 = require("./board.service");
const board_create_request_1 = require("./dto/board-create.request");
const board_profile_response_1 = require("./dto/board-profile.response");
let BoardController = class BoardController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    async getBoards() {
        return this.boardService.getBoards();
    }
    async createBoard(boardCreateRequest) {
        const board = await this.boardService.createBoard({ boardCreateRequest });
        return new board_profile_response_1.BoardProfileResponse(board);
    }
    async updateBoard(boardId, boardUpdateRequest) {
        const board = await this.boardService.updateBoard({
            boardId,
            boardUpdateRequest,
        });
        return new board_profile_response_1.BoardProfileResponse(board);
    }
    async deleteBoard(boardId) {
        await this.boardService.deleteBoard({ boardId });
        return;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "getBoards", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_create_request_1.BoardCreateRequest]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "createBoard", null);
__decorate([
    (0, common_1.Put)(':boardId'),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "updateBoard", null);
__decorate([
    (0, common_1.Delete)(':boardId'),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "deleteBoard", null);
BoardController = __decorate([
    (0, swagger_1.ApiTags)('[커뮤니티] 게시판'),
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
exports.BoardController = BoardController;
//# sourceMappingURL=board.controller.js.map