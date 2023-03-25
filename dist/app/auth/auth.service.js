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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../../constants");
const token_response_1 = require("./dto/token.response");
const jwt_types_1 = require("../infrastructure/types/jwt.types");
const user_service_1 = require("../user/user.service");
const auth_errors_1 = require("../../domain/errors/auth.errors");
let AuthService = class AuthService {
    constructor(jwtService, userService, httpService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.httpService = httpService;
    }
    async kakaoLogin(data) {
        const { accessToken: kakaoAccessToken } = data;
        if (!kakaoAccessToken) {
            throw new common_1.UnauthorizedException();
        }
        const headerUserInfo = {
            Authorization: 'Bearer ' + kakaoAccessToken,
        };
        const responseUserInfo = await this.httpService.axiosRef.request({
            method: 'POST',
            url: `https://kapi.kakao.com/v2/user/me`,
            headers: headerUserInfo,
        });
        if (responseUserInfo.status !== 200) {
            throw new common_1.UnauthorizedException();
        }
        const userInfo = responseUserInfo.data;
        return userInfo;
    }
    async login(id) {
        const user = await this.userService.findById(id);
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(user.id),
            this.generateRefreshToken(user.id),
        ]);
        return { accessToken, refreshToken };
    }
    async refresh(req) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken)
            throw new common_1.UnauthorizedException();
        const token = this.jwtService.decode(refreshToken);
        if (!token || token.sub !== jwt_types_1.JwtSubjectType.REFRESH) {
            throw new auth_errors_1.InvalidTokenException();
        }
        const account = await this.userService.findById(token.user_id);
        const accessToken = await this.generateAccessToken(account.id);
        return new token_response_1.TokenResponse({ accessToken });
    }
    logout(req, res) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken)
            throw new common_1.UnauthorizedException();
        res.clearCookie('refresh_token', {
            path: '/auth',
            httpOnly: true,
        });
        return true;
    }
    async generateAccessToken(userId) {
        return this.jwtService.signAsync({ user_id: userId }, {
            expiresIn: constants_1.ACCESS_TOKEN_EXPIRE,
            subject: jwt_types_1.JwtSubjectType.ACCESS,
        });
    }
    async generateRefreshToken(userId) {
        return this.jwtService.signAsync({ user_id: userId }, {
            expiresIn: constants_1.REFRESH_TOKEN_EXPIRE,
            subject: jwt_types_1.JwtSubjectType.REFRESH,
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        axios_1.HttpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map