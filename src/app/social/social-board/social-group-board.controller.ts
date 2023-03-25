import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiExcludeController,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SocialGroupBoardCreateRequest } from '@app/social/social-board/dto/social-group-board-create.request';
import { SocialGroupBoardProfileResponse } from '@app/social/social-board/dto/social-group-board-profile.response';
import { SocialGroupBoardUpdateRequest } from '@app/social/social-board/dto/social-group-board-update.request';
import { SocialGroupBoardService } from '@app/social/social-board/social-group-board.service';

@Controller()
@ApiExcludeController()
@ApiTags('[커뮤니티] 소셜링 게시판')
export class SocialGroupBoardController {
  constructor(private readonly socialBoardService: SocialGroupBoardService) {}

  @Get('social-group-boards')
  @ApiOperation({ summary: '소셜링 게시판 목록 조회' })
  @ApiResponse({ type: String, isArray: true })
  async getSocialGroupBoards(): Promise<SocialGroupBoardProfileResponse[]> {
    const socialGroupBoards =
      await this.socialBoardService.getSocialGroupBoards();

    return socialGroupBoards.map((board) => {
      return new SocialGroupBoardProfileResponse(board);
    });
  }

  @Post('social-group-boards')
  async createSocialGroupBoard(
    @Body() data: SocialGroupBoardCreateRequest,
  ): Promise<SocialGroupBoardProfileResponse> {
    return await this.socialBoardService.createSocialGroupBoard(data);
  }

  @Patch('social-group-boards/:socialGroupBoardId')
  async updateSocialGroupBoard(
    @Param('socialGroupBoardId') socialGroupBoardId: string,
    @Body() data: SocialGroupBoardUpdateRequest,
  ): Promise<SocialGroupBoardProfileResponse> {
    const socialGroupBoard =
      await this.socialBoardService.updateSocialGroupBoard({
        socialGroupBoardId,
        data,
      });

    return new SocialGroupBoardProfileResponse(socialGroupBoard);
  }

  @Delete('social-group-boards/:socialGroupBoardId')
  async deleteSocialGroupBoard(
    @Param('socialGroupBoardId') socialGroupBoardId: string,
  ): Promise<void> {
    return await this.socialBoardService.deleteSocialGroupBoard({
      socialGroupBoardId,
    });
  }
}
