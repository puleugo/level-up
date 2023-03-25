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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_service_1 = require("../board/board.service");
const post_service_1 = require("../post/post.service");
const user_service_1 = require("../../user/user.service");
const user_errors_1 = require("../../../domain/errors/user.errors");
const board_entity_1 = require("../../../domain/post/board.entity");
const post_comment_entity_1 = require("../../../domain/post/post-comment.entity");
let CommentService = class CommentService {
    constructor(boardService, postService, userService, postCommentRepository, boardRepository) {
        this.boardService = boardService;
        this.postService = postService;
        this.userService = userService;
        this.postCommentRepository = postCommentRepository;
        this.boardRepository = boardRepository;
    }
    async getComments(data) {
        return await this.findCommentsByPostId(data.postId);
    }
    async createComment(data) {
        const author = await this.userService.findById(data.author.id);
        return await this.postCommentRepository.save(Object.assign({ author }, data.postCommentCreateRequest));
    }
    async createReply(data) {
        const author = await this.userService.findById(data.author.id);
        const comment = await this.findById(data.postCommentId);
        return await this.postCommentRepository.save(Object.assign(Object.assign({ author }, data.postCommentCreateRequest), { parent: comment }));
    }
    async updateComment(data) {
        const author = await this.userService.findById(data.author.id);
        const comment = await this.findById(data.postCommentId);
        if (comment.author.id !== author.id)
            throw new user_errors_1.UserAccessDeniedException();
        return await this.postCommentRepository.save(Object.assign(Object.assign({}, comment), data.postCommentUpdateRequest));
    }
    async deleteComment(data) {
        const author = await this.userService.findById(data.author.id);
        const comment = await this.findById(data.postCommentId);
        if (comment.author.id !== author.id)
            throw new user_errors_1.UserAccessDeniedException();
        await this.postCommentRepository.softDelete({ id: comment.id });
        return;
    }
    async findCommentsByPostId(postId) {
        return await this.postCommentRepository.find({
            where: { post: { id: postId } },
        });
    }
    async findById(postCommentId) {
        return await this.postCommentRepository.findOne({
            where: { id: postCommentId },
        });
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(post_comment_entity_1.PostComment)),
    __param(4, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [board_service_1.BoardService,
        post_service_1.PostService,
        user_service_1.UserService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map