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
exports.SocialGroupPostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const social_create_request_1 = require("./dto/social-create.request");
const social_member_profile_response_1 = require("./dto/social-member-profile.response");
const social_profile_response_1 = require("./dto/social-profile.response");
const social_update_request_1 = require("./dto/social-update.request");
const social_group_post_service_1 = require("./social-group-post.service");
let SocialGroupPostController = class SocialGroupPostController {
    constructor(socialService) {
        this.socialService = socialService;
    }
    async getSocials(page, limit, socialGroupBoardId) {
        const { items, meta } = await this.socialService.getSocials({
            page,
            limit,
            socialGroupBoardId,
        });
        return {
            items,
            meta,
        };
    }
    async getTopSocials() {
        return;
    }
    async getSocialProfile(socialGroupPostId) {
        const socialGroup = await this.socialService.getSocialProfile({
            socialGroupPostId,
        });
        return new social_profile_response_1.SocialProfileResponse(socialGroup);
    }
    async getSocialInviteRequestList(socialGroupPostId, { user }) {
        const members = await this.socialService.getSocialInviteRequestList({
            socialGroupPostId,
            admin: user,
        });
        return members.map((member) => new social_member_profile_response_1.SocialMemberProfileResponse(Object.assign(Object.assign({}, member), member.user)));
    }
    async joinSocial(socialGroupPostId, { user }) {
        return await this.socialService.joinSocial({
            socialGroupPostId,
            user,
        });
    }
    async createSocial(socialGroupBoardId, data, { user }) {
        const socialGroup = await this.socialService.createSocial({
            socialGroupBoardId,
            data,
            user,
        });
        console.log(socialGroup);
        return new social_profile_response_1.SocialProfileResponse(socialGroup);
    }
    async createSocialComment() {
        return;
    }
    async requestInviteSocial(socialGroupPostId, { user }) {
        return await this.socialService.requestInviteSocial({
            socialGroupPostId,
            user,
        });
    }
    async acceptInviteSocial(socialGroupPostId, userId, { user }) {
        return await this.socialService.acceptInviteSocial({
            socialGroupPostId,
            userId,
            user,
        });
    }
    async leaveSocial(socialGroupPostId, { user }) {
        return await this.socialService.leaveSocial({
            socialGroupPostId,
            user,
        });
    }
    async kickSocial(socialGroupPostId, kickUserId, { user }) {
        return await this.socialService.kickSocial({
            socialGroupPostId,
            kickUserId,
            user,
        });
    }
    async reportSocial() {
        return;
    }
    async updateSocial(socialGroupPostId, { user }, data) {
        const socialGroup = await this.socialService.updateSocial(socialGroupPostId, user, data);
        return new social_profile_response_1.SocialProfileResponse(socialGroup);
    }
};
__decorate([
    (0, common_1.Get)('social-group-boards/:socialGroupBoardId/social-group-posts'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('socialGroupBoardId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "getSocials", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "getTopSocials", null);
__decorate([
    (0, common_1.Get)('social-group-posts/:socialGroupPostId'),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "getSocialProfile", null);
__decorate([
    (0, common_1.Get)('social-group-posts/:socialGroupPostId/invite-requests'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "getSocialInviteRequestList", null);
__decorate([
    (0, common_1.Post)('social-group-posts/:socialGroupPostId/join'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "joinSocial", null);
__decorate([
    (0, common_1.Post)('social-group-boards/:socialGroupBoardId/social-group-posts'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('socialGroupBoardId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, social_create_request_1.SocialCreateRequest, Object]),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "createSocial", null);
__decorate([
    (0, common_1.Post)(':socialGroupPostId/comment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "createSocialComment", null);
__decorate([
    (0, common_1.Post)('social-group-posts/:socialGroupPostId/request-invite'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "requestInviteSocial", null);
__decorate([
    (0, common_1.Post)('social-group-posts/:socialGroupPostId/accept-invite/:userId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "acceptInviteSocial", null);
__decorate([
    (0, common_1.Delete)('social-group-posts/:socialGroupPostId/leave'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "leaveSocial", null);
__decorate([
    (0, common_1.Post)('social-group-posts/:socialGroupPostId/kick/:userId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('kickUserId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "kickSocial", null);
__decorate([
    (0, common_1.Post)('social-group-posts/:socialGroupPostId/report'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "reportSocial", null);
__decorate([
    (0, common_1.Put)('social-group-posts/:socialGroupPostId'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('socialGroupPostId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, social_update_request_1.SocialUpdateRequest]),
    __metadata("design:returntype", Promise)
], SocialGroupPostController.prototype, "updateSocial", null);
SocialGroupPostController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [social_group_post_service_1.SocialGroupPostService])
], SocialGroupPostController);
exports.SocialGroupPostController = SocialGroupPostController;
//# sourceMappingURL=social-group-post.controller.js.map