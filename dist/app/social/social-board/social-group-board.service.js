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
exports.SocialGroupBoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const social_group_board_errors_1 = require("../../../domain/errors/social/social-group-board.errors");
const social_group_1 = require("../../../domain/social/social-group");
const social_group_board_entity_1 = require("../../../domain/social/social-group-board.entity");
let SocialGroupBoardService = class SocialGroupBoardService {
    constructor(socialGroupBoardRepository) {
        this.socialGroupBoardRepository = socialGroupBoardRepository;
    }
    async getSocialGroupBoards() {
        return await this.socialGroupBoardRepository.find();
    }
    async findById(id) {
        return await this.socialGroupBoardRepository.findOne({ where: { id } });
    }
    async findByCategory(category) {
        return await this.socialGroupBoardRepository.findOne({
            where: { category },
        });
    }
    async initSocialGroupBoards() {
        const communityCategories = Object.values(social_group_1.SocialGroupType).filter((key) => typeof key === 'string');
        return await Promise.all(communityCategories.map((category) => {
            return this.socialGroupBoardRepository.save({
                category,
            });
        }));
    }
    async createSocialGroupBoard(data) {
        const board = await this.findByCategory(data.category);
        if (board) {
            throw new social_group_board_errors_1.SocialGroupBoardAlreadyExistsException();
        }
        return await this.socialGroupBoardRepository.save(data);
    }
    async updateSocialGroupBoard(data) {
        const board = await this.findById(data.socialGroupBoardId);
        if (!board) {
            throw new social_group_board_errors_1.SocialGroupBoardNotFoundException();
        }
        return await this.socialGroupBoardRepository.save(Object.assign(Object.assign({}, board), data.data));
    }
    async deleteSocialGroupBoard(data) {
        await this.socialGroupBoardRepository.softDelete(data.socialGroupBoardId);
        return;
    }
};
SocialGroupBoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(social_group_board_entity_1.SocialGroupBoard)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SocialGroupBoardService);
exports.SocialGroupBoardService = SocialGroupBoardService;
//# sourceMappingURL=social-group-board.service.js.map