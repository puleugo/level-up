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
exports.SocialCommentController = void 0;
const common_1 = require("@nestjs/common");
const social_comment_service_1 = require("./social-comment.service");
let SocialCommentController = class SocialCommentController {
    constructor(socialCommentService) {
        this.socialCommentService = socialCommentService;
    }
    async getComments(socialGroupBoardId, socialGroupPostId) {
        return this.socialCommentService.getComments({
            socialGroupPostId,
        });
    }
    async createComment(socialGroupPostId) {
        return this.socialCommentService.createComment({
            socialGroupPostId,
        });
    }
    async createReply(socialGroupPostId, socialGroupCommentId) {
        return await this.socialCommentService.createReply({
            socialGroupPostId,
            socialGroupCommentId,
        });
    }
    async hitLike(socialGroupPostId, socialGroupCommentId) {
        return await this.socialCommentService.hitLike({
            socialGroupPostId,
            socialGroupCommentId,
        });
    }
    async updateComment(socialGroupPostId, socialGroupCommentId) {
        return await this.socialCommentService.updateComment({
            socialGroupPostId,
            socialGroupCommentId,
        });
    }
    async deleteComment(socialGroupPostId, socialGroupCommentId) {
        return await this.socialCommentService.deleteComment({
            socialGroupPostId,
            socialGroupCommentId,
        });
    }
};
__decorate([
    (0, common_1.Get)('social-group-posts/:socialGroupPostId/social-group-comments'),
    __param(0, (0, common_1.Param)('socialGroupBoardId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SocialCommentController.prototype, "getComments", null);
__decorate([
    (0, common_1.Post)('social-group-posts/:socialGroupPostId/social-group-comments'),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialCommentController.prototype, "createComment", null);
__decorate([
    (0, common_1.Post)('social-group-posts/:socialGroupPostId/social-group-comments/:socialGroupCommentId'),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('socialGroupCommentId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SocialCommentController.prototype, "createReply", null);
__decorate([
    (0, common_1.Post)('social-group-posts/:socialGroupPostId/social-group-comments/:socialGroupCommentId'),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('socialGroupCommentId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SocialCommentController.prototype, "hitLike", null);
__decorate([
    (0, common_1.Patch)('social-group-posts/:socialGroupPostId/social-group-comments/:socialGroupCommentId'),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('socialGroupCommentId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SocialCommentController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)('social-group-posts/:socialGroupPostId/social-group-comments/:socialGroupCommentId'),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('socialGroupCommentId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SocialCommentController.prototype, "deleteComment", null);
SocialCommentController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [social_comment_service_1.SocialCommentService])
], SocialCommentController);
exports.SocialCommentController = SocialCommentController;
//# sourceMappingURL=social-comment.controller.js.map