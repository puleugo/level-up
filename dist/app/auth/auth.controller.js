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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const kakao_auth_request_1 = require("./dto/kakao-auth.request");
const token_response_1 = require("./dto/token.response");
const jwt_guard_1 = require("./guards/jwt.guard");
const user_profile_response_1 = require("../user/dto/user-profile.response");
const user_service_1 = require("../user/user.service");
const user_1 = require("../../domain/user/user");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async getMyProfile({ userData }) {
        const user = await this.userService.getProfileById(userData);
        return new user_profile_response_1.UserProfileResponse(Object.assign({}, user));
    }
    async kakaoLogin(accountRequestInfo) {
        const { accessToken: kakaoAccessToken } = accountRequestInfo;
        if (!kakaoAccessToken) {
            throw new common_1.BadRequestException('카카오 정보가 없습니다.');
        }
        const kakao = await this.authService.kakaoLogin({
            accessToken: kakaoAccessToken,
        });
        if (!kakao.id) {
            throw new common_1.BadRequestException('카카오 정보가 없습니다.');
        }
        const user = await this.userService.findByUsername(kakao.id.toString());
        if (!user) {
            const user = await this.userService.joinUser({
                user: {
                    nickname: kakao.kakao_account.profile.nickname,
                    profileImageUrl: kakao.kakao_account.profile.profile_image_url,
                },
                authType: {
                    username: kakao.id.toString(),
                    snsType: user_1.UserSNS.KAKAO,
                },
            });
            return this.authService.login(user.id);
        }
        return this.authService.login(user.id);
    }
    async refresh(req) {
        return this.authService.refresh(req);
    }
    async logout(req, res) {
        return this.authService.logout(req, res);
    }
    async getToken(userId) {
        return await this.authService.login(userId);
    }
    googleLogin() { }
    googleLoginCallback(req) {
        return req.user;
    }
};
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'API 호출에 필요한 회원의 기본 정보를 호출합니다.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Post)('login/kakao'),
    (0, swagger_1.ApiOperation)({ summary: '카카오 로그인을 진행합니다.' }),
    (0, swagger_1.ApiBody)({ type: kakao_auth_request_1.KakaoAuthRequest }),
    (0, swagger_1.ApiResponse)({
        type: token_response_1.TokenResponse,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kakao_auth_request_1.KakaoAuthRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoLogin", null);
__decorate([
    (0, common_1.Patch)('refresh'),
    (0, swagger_1.ApiOperation)({ summary: '액세스 토큰을 갱신합니다.' }),
    (0, swagger_1.ApiResponse)({
        type: token_response_1.TokenResponse,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Delete)('logout'),
    (0, swagger_1.ApiOperation)({ summary: '토큰을 만료 처리합니다.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('test/:userId'),
    (0, swagger_1.ApiOperation)({ summary: '로컬에서 테스트를 위한 토큰을 발급합니다.' }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getToken", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLoginCallback", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('[인증] 인증'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map