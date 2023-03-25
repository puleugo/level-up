import * as process from 'process';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from '@app/auth/auth.service';
import { KakaoAuthRequest } from '@app/auth/dto/kakao-auth.request';
import { TokenResponse } from '@app/auth/dto/token.response';
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { Request } from '@app/infrastructure/types/request.types';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';
import { UserService } from '@app/user/user.service';
import { UserSNS } from '@domain/user/user';

@Controller('auth')
@ApiTags('[인증] 인증')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'API 호출에 필요한 회원의 기본 정보를 호출합니다.',
    description: 'JWT ACCESS 토큰이 필요합니다.',
  })
  @ApiBearerAuth()
  async getMyProfile(
    @Req() { userData }: Request,
  ): Promise<UserProfileResponse> {
    const user = await this.userService.getProfileById(userData);
    return new UserProfileResponse({
      ...user,
    });
  }

  @Post('login/kakao')
  @ApiOperation({
    summary: '카카오 로그인을 진행합니다.',
  })
  @ApiBody({ type: KakaoAuthRequest })
  @ApiResponse({
    type: TokenResponse,
  })
  async kakaoLogin(
    @Body() accountRequestInfo: KakaoAuthRequest,
  ): Promise<TokenResponse> {
    // 카카오 토큰 조회 후 계정 정보 가져오기
    const { accessToken: kakaoAccessToken } = accountRequestInfo;
    if (!kakaoAccessToken) {
      throw new BadRequestException('카카오 정보가 없습니다.');
    }

    const kakao = await this.authService.kakaoLogin({
      accessToken: kakaoAccessToken,
    });

    if (!kakao.id) {
      throw new BadRequestException('카카오 정보가 없습니다.');
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
          snsType: UserSNS.KAKAO,
        },
      });

      return this.authService.login(user.id);
    }

    return this.authService.login(user.id);
  }

  @Patch('refresh')
  @ApiOperation({ summary: '액세스 토큰을 갱신합니다.' })
  @ApiResponse({
    type: TokenResponse,
  })
  async refresh(@Req() req: Request): Promise<TokenResponse> {
    return this.authService.refresh(req);
  }

  @Delete('logout')
  @ApiOperation({ summary: '토큰을 만료 처리합니다.' })
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res,
  ): Promise<boolean> {
    return this.authService.logout(req, res);
  }

  @Get('test/:userId')
  @ApiExcludeEndpoint(process.env.APP_URL !== 'http://localhost:3000')
  @ApiOperation({ summary: '로컬에서 테스트를 위한 토큰을 발급합니다.' })
  async getToken(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<TokenResponse> {
    return await this.authService.login(userId);
  }

  @Get('google')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return;
  }

  @Get('google/callback')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req) {
    return req.user;
  }
}
