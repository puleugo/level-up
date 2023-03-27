import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { Request } from '@app/infrastructure/types/request.types';
import { MissionAlarmResponse } from '@app/todo/dto/mission/todo-alarm.response';
import { UserMissionResponse } from '@app/todo/dto/mission/user-mission-response';
import { UserAddressRequest } from '@app/user/dto/user-address.request';
import { UserAddressResponse } from '@app/user/dto/user-address.response';
import { UserDetailProfileResponse } from '@app/user/dto/user-profile-detail.response';
import { UserService } from '@app/user/user.service';
import { AUTH_ERRORS } from '@domain/errors/auth.errors';
import { USER_ERRORS } from '@domain/errors/user.errors';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('[유저] 계정')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('address')
  @ApiOperation({
    summary: '사용자의 위치 정보를 업데이트합니다.',
    externalDocs: {
      description: '카카오 API: 좌표로 주소 변환하기',
      url: 'https://developers.kakao.com/docs/latest/ko/local/dev-guide#coord-to-address',
    },
  })
  @ApiBody({ type: UserAddressRequest })
  @ApiResponse({ type: UserAddressResponse })
  @ApiNotFoundResponse({ description: USER_ERRORS.USER_NOT_FOUND })
  @ApiBadRequestResponse({ description: AUTH_ERRORS.KAKAO_API_FAILED })
  async updateUserAddress(
    @Body() address: UserAddressRequest,
    @Req() { user }: Request,
  ): Promise<UserAddressResponse> {
    const userAddress = await this.userService.updateUserAddress(
      user.id,
      address,
    );
    return new UserAddressResponse(userAddress);
  }

  @Get('detail')
  @ApiOperation({
    summary: '사용자의 상세 정보를 조회합니다.',
  })
  async getUserDetailProfile(
    @Req() { user }: Request,
  ): Promise<UserDetailProfileResponse> {
    const userDetailProfile = await this.userService.getUserDetailProfile({
      userId: user.id,
    });
    return new UserDetailProfileResponse(userDetailProfile);
  }

  @Get('progress')
  @ApiOperation({
    summary: '사용자의 미션 진척도 확인',
  })
  async getMyProgress(
    @Req() { user }: Request,
  ): Promise<UserMissionResponse[]> {
    const toDos = await this.userService.findProgressById(user.id);
    return toDos.map((todo) => new UserMissionResponse(todo));
  }

  @Get('alarms')
  async getMyAlarms(@Req() { user }: Request): Promise<MissionAlarmResponse[]> {
    const alarms = await this.userService.findAlarmsById(user.id);
    return alarms.map((alarm) => new MissionAlarmResponse(alarm));
  }
}
