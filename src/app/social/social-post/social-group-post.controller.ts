import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiExcludeController,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { SocialCreateRequest } from '@app/social/social-post/dto/social-create.request';
import { SocialMemberProfileResponse } from '@app/social/social-post/dto/social-member-profile.response';
import { SocialPreviewResponse } from '@app/social/social-post/dto/social-preview.response';
import { SocialProfileResponse } from '@app/social/social-post/dto/social-profile.response';
import { SocialUpdateRequest } from '@app/social/social-post/dto/social-update.request';
import { SocialGroupPostService } from '@app/social/social-post/social-group-post.service';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';
import { SOCIAL_ERRORS } from '@domain/errors/social.errors';
import { USER_ERRORS } from '@domain/errors/user.errors';
import { SocialGroupType } from '@domain/social/social-group';
import { Pagination } from '@infrastructure/types/pagination.types';
import { Request } from '@infrastructure/types/request.types';

@Controller()
@ApiExcludeController()
@ApiTags('[커뮤니티] 소셜 게시글')
export class SocialGroupPostController {
  constructor(private readonly socialService: SocialGroupPostService) {}

  @Get('social-group-boards/:socialGroupBoardId/social-group-posts')
  @ApiOperation({ summary: '소셜링 목록 조회' })
  @ApiQuery({ name: 'category', enum: SocialGroupType, required: false })
  @ApiResponse({ type: SocialPreviewResponse, isArray: true })
  async getSocials(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Param('socialGroupBoardId', ParseUUIDPipe) socialGroupBoardId: string,
  ): Promise<Pagination<SocialPreviewResponse>> {
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

  @Get()
  @ApiOperation({ summary: 'TOP 소셜링 조회' })
  async getTopSocials(): Promise<SocialPreviewResponse[]> {
    return;
  }

  @Get('social-group-posts/:socialGroupPostId')
  @ApiOperation({ summary: '소셜링 상세 조회' })
  @ApiResponse({ type: SocialProfileResponse })
  @ApiNotFoundResponse({ description: SOCIAL_ERRORS.SOCIAL_NOT_FOUND })
  async getSocialProfile(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
  ): Promise<SocialProfileResponse> {
    const socialGroup = await this.socialService.getSocialProfile({
      socialGroupPostId,
    });
    return new SocialProfileResponse(socialGroup);
  }

  @Get('social-group-posts/:socialGroupPostId/invite-requests')
  @ApiOperation({ summary: '소셜링 초대 요청 목록 조회' })
  @ApiNotFoundResponse({ description: SOCIAL_ERRORS.SOCIAL_NOT_FOUND })
  @ApiNotFoundResponse({ description: USER_ERRORS.USER_NOT_FOUND })
  @ApiBadRequestResponse({
    description: SOCIAL_ERRORS.SOCIAL_USER_IS_NOT_ADMIN,
  })
  @ApiResponse({ type: UserProfileResponse, isArray: true })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getSocialInviteRequestList(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Req() { user }: Request,
  ): Promise<SocialMemberProfileResponse[]> {
    const members = await this.socialService.getSocialInviteRequestList({
      socialGroupPostId,
      admin: user,
    });
    return members.map(
      (member) =>
        new SocialMemberProfileResponse({
          ...member,
          ...member.user,
        }),
    );
  }

  @Post('social-group-posts/:socialGroupPostId/join')
  @ApiOperation({ summary: '소셜링 가입' })
  @ApiResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: SOCIAL_ERRORS.SOCIAL_NOT_FOUND })
  @ApiNotFoundResponse({ description: USER_ERRORS.USER_NOT_FOUND })
  @ApiBadRequestResponse({ description: SOCIAL_ERRORS.HAVE_TO_REQUEST_JOIN })
  @ApiConflictResponse({
    description: SOCIAL_ERRORS.SOCIAL_REQUEST_ALREADY_EXIST,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async joinSocial(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Req() { user }: Request,
  ): Promise<boolean> {
    return await this.socialService.joinSocial({
      socialGroupPostId,
      user,
    });
  }

  @Post('social-group-boards/:socialGroupBoardId/social-group-posts')
  @ApiOperation({ summary: '소셜링 생성' })
  @ApiBody({
    type: SocialCreateRequest,
    examples: {
      '온라인 소셜링 생성': {
        value: {
          title: '소셜링 제목',
          content: '소셜링 내용',
          recruitment: 10,
          type: SocialGroupType.EXERCISE,
          recruitmentConditions: {
            maxAge: 50,
            minAge: 20,
            onlyMale: false,
            onlyFemale: false,
          },
          thumbnailUrl: 'https://thumbnail.url',
          needApprove: true,
          endAt: new Date(),
          isOffline: false,
          socialAt: new Date(),
        },
      },
      '오프라인 소셜링 생성': {
        value: {
          title: '소셜링 제목',
          content: '소셜링 내용',
          recruitment: 10,
          type: SocialGroupType.EXERCISE,
          recruitmentConditions: {
            maxAge: 50,
            minAge: 20,
            onlyMale: false,
            onlyFemale: false,
          },
          thumbnailUrl: 'https://thumbnail.url',
          needApprove: true,
          endAt: new Date(),
          isOffline: true,
          socialPlace: {
            buildingName: '빌딩 이름',
            latitude: 37.123456,
            longitude: 127.123456,
            placeAddress: '상세 주소',
            region1DepthName: '시/도',
            region2DepthName: '시/군/구',
            region3DepthName: '동/읍/면',
          },
          socialAt: new Date(),
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: USER_ERRORS.USER_NOT_FOUND,
  })
  @ApiBadRequestResponse({ description: SOCIAL_ERRORS.SOCIAL_PLACE_NOT_FOUND })
  @ApiResponse({ type: SocialProfileResponse })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createSocial(
    @Param('socialGroupBoardId', ParseUUIDPipe) socialGroupBoardId: string,
    @Body() data: SocialCreateRequest,
    @Req() { user }: Request,
  ): Promise<SocialProfileResponse> {
    const socialGroup = await this.socialService.createSocial({
      socialGroupBoardId,
      data,
      user,
    });
    console.log(socialGroup);
    return new SocialProfileResponse(socialGroup);
  }

  @Post(':socialGroupPostId/comment')
  @ApiOperation({ summary: '소셜링 댓글 생성 | 🐥 개발중' })
  async createSocialComment() {
    return;
  }

  @Post('social-group-posts/:socialGroupPostId/request-invite')
  @ApiOperation({ summary: '소셜링 초대 신청' })
  @ApiResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: SOCIAL_ERRORS.SOCIAL_NOT_FOUND })
  @ApiBadRequestResponse({
    description: [
      SOCIAL_ERRORS.DONT_HAVE_TO_REQUEST,
      SOCIAL_ERRORS.SOCIAL_ADMIN_CANT_REQUEST_INVITE,
    ].join(', '),
  })
  @ApiConflictResponse({
    description: SOCIAL_ERRORS.SOCIAL_REQUEST_ALREADY_EXIST,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async requestInviteSocial(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Req() { user }: Request,
  ): Promise<boolean> {
    return await this.socialService.requestInviteSocial({
      socialGroupPostId,
      user,
    });
  }

  @Post('social-group-posts/:socialGroupPostId/accept-invite/:userId')
  @ApiOperation({ summary: '소셜링 초대 수락' })
  @ApiResponse({ type: Boolean })
  @ApiNotFoundResponse({
    description: [
      SOCIAL_ERRORS.SOCIAL_NOT_FOUND,
      USER_ERRORS.USER_NOT_FOUND,
      SOCIAL_ERRORS.SOCIAL_REQUEST_NOT_FOUND,
    ].join(', '),
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async acceptInviteSocial(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Req() { user }: Request,
  ): Promise<boolean> {
    return await this.socialService.acceptInviteSocial({
      socialGroupPostId,
      userId,
      user,
    });
  }

  @Delete('social-group-posts/:socialGroupPostId/leave')
  @ApiOperation({ summary: '소셜링 탈퇴' })
  @ApiResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: SOCIAL_ERRORS.SOCIAL_NOT_FOUND })
  @ApiConflictResponse({
    description: SOCIAL_ERRORS.SOCIAL_CANT_LEAVE_AT_NOT_JOIN,
  })
  @ApiBadRequestResponse({ description: SOCIAL_ERRORS.SOCIAL_ADMIN_CANT_LEAVE })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async leaveSocial(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Req() { user }: Request,
  ): Promise<boolean> {
    return await this.socialService.leaveSocial({
      socialGroupPostId,
      user,
    });
  }

  @Post('social-group-posts/:socialGroupPostId/kick/:userId')
  @ApiOperation({ summary: '소셜링 추방' })
  @ApiResponse({ type: Boolean })
  @ApiNotFoundResponse({
    description: [
      SOCIAL_ERRORS.SOCIAL_USER_NOT_FOUND_EXCEPTION,
      USER_ERRORS.USER_NOT_FOUND,
    ].join(', '),
  })
  @ApiBadRequestResponse({
    description: [
      SOCIAL_ERRORS.SOCIAL_USER_IS_NOT_ADMIN,
      SOCIAL_ERRORS.SOCIAL_CANT_KICK_ADMIN,
    ].join(', '),
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async kickSocial(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Param('kickUserId', ParseUUIDPipe) kickUserId: string,
    @Req() { user }: Request,
  ): Promise<boolean> {
    return await this.socialService.kickSocial({
      socialGroupPostId,
      kickUserId,
      user,
    });
  }

  @Post('social-group-posts/:socialGroupPostId/report')
  @ApiOperation({ summary: '소셜링 신고 | 🐥 기획 나오면 개발 진행' })
  @ApiResponse({ type: Boolean })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async reportSocial(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Req() { user }: Request,
  ): Promise<boolean> {
    return;
  }

  @Put('social-group-posts/:socialGroupPostId')
  @ApiOperation({ summary: '소셜링 수정' })
  @ApiBody({ type: SocialUpdateRequest })
  @ApiResponse({ type: SocialProfileResponse })
  @ApiNotFoundResponse({
    description: [
      SOCIAL_ERRORS.SOCIAL_NOT_FOUND,
      USER_ERRORS.USER_NOT_FOUND,
    ].join(', '),
  })
  @ApiBadRequestResponse({
    description: SOCIAL_ERRORS.SOCIAL_USER_IS_NOT_ADMIN,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateSocial(
    @Param('socialGroupPostId', ParseUUIDPipe) socialGroupPostId: string,
    @Req() { user }: Request,
    @Body() data: SocialUpdateRequest,
  ): Promise<SocialProfileResponse> {
    const socialGroup = await this.socialService.updateSocial(
      socialGroupPostId,
      user,
      data,
    );
    return new SocialProfileResponse(socialGroup);
  }
}
