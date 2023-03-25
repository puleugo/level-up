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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_entity_1 = require("../../../domain/post/board.entity");
const post_entity_1 = require("../../../domain/post/post.entity");
let BoardService = class BoardService {
    constructor(boardRepository, postRepository) {
        this.boardRepository = boardRepository;
        this.postRepository = postRepository;
    }
    async getBoards() {
        return this.boardRepository.find();
    }
    async createBoard(data) {
        return await this.boardRepository.save(Object.assign({}, data.boardCreateRequest));
    }
    async updateBoard(data) {
        const board = await this.boardRepository.findOne({
            where: { id: data.boardId },
        });
        return await this.boardRepository.save(Object.assign(Object.assign({}, board), data.boardUpdateRequest));
    }
    async deleteBoard(data) {
        await this.boardRepository.softDelete({ id: data.boardId });
        return;
    }
    async findById(boardId) {
        return this.boardRepository.findOne({
            where: { id: boardId },
            relations: ['posts'],
        });
    }
};
BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BoardService);
exports.BoardService = BoardService;
//# sourceMappingURL=board.service.js.map