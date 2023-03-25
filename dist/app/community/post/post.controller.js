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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const memoir_create_request_1 = require("./dto/memoir-create.request");
const memoir_profile_response_1 = require("./dto/memoir-profile.response");
const post_create_request_1 = require("./dto/post-create.request");
const post_profile_response_1 = require("./dto/post-profile.response");
const post_update_requests_1 = require("./dto/post-update.requests");
const post_service_1 = require("./post.service");
const user_entity_1 = require("../../../domain/user/user.entity");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async getPosts(page, limit, boardId) {
        return this.postService.getPosts({ page, limit, boardId });
    }
    async getPostProfile(postId) {
        return this.postService.getPostProfile(postId);
    }
    async createPost(boardId, author, postCreateRequest) {
        const post = await this.postService.createPost({
            boardId,
            author,
            postCreateRequest,
        });
        return new post_profile_response_1.PostProfileResponse(post);
    }
    async hitLike() {
        return await this.postService.hitLike();
    }
    async updatePost(postId, author, postUpdateRequest) {
        const post = await this.postService.updatePost({
            postId,
            author,
            postUpdateRequest,
        });
        return new post_profile_response_1.PostProfileResponse(post);
    }
    async deletePost(postId, author) {
        return await this.postService.deletePost({ postId, author });
    }
    async postMemoir(author, memoirCreateRequest) {
        const memoir = await this.postService.postMemoir({
            author,
            memoirCreateRequest,
        });
        return new memoir_profile_response_1.MemoirProfileResponse(memoir);
    }
};
__decorate([
    (0, common_1.Get)('board/:boardId/posts'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('boardId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Get)('posts/:postId'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostProfile", null);
__decorate([
    (0, common_1.Post)('board/:boardId/posts'),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        post_create_request_1.PostCreateRequest]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Post)('posts/:postId/like'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "hitLike", null);
__decorate([
    (0, common_1.Put)('posts/:postId'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        post_update_requests_1.PostUpdateRequest]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)('posts/:postId'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)('memoirs'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        memoir_create_request_1.MemoirCreateRequest]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "postMemoir", null);
PostController = __decorate([
    (0, swagger_1.ApiTags)('[커뮤니티] 게시글'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map