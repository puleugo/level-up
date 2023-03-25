import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import {
  SocialCreateRequestCommand,
  SocialPlaceCreateRequestCommand,
} from '@app/social/social-post/commands/social.commands';
import { SocialRecruitmentConditionCreateRequest } from '@app/social/social-post/dto/social-recruitment-condition-create.request';

export class SocialCreateRequest implements SocialCreateRequestCommand {
  @ApiProperty({ example: '소셜링 제목' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '소셜링 내용' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 10, description: '모집 인원' })
  @IsNotEmpty()
  @IsNumber()
  recruitment: number;

  @ApiProperty({
    example: SocialRecruitmentConditionCreateRequest,
    description: '모집 조건',
  })
  recruitmentConditions: SocialRecruitmentConditionCreateRequest;

  @ApiProperty({ example: 'https://image.com', description: '썸네일 이미지' })
  @IsNotEmpty()
  @IsUrl()
  thumbnailUrl: string | null;

  @ApiProperty({ description: '소셜링 참여 수락 필요 여부' })
  needApprove: boolean;

  @ApiProperty({ description: '소셜링 모집 마감 시간' })
  endAt: Date;

  @ApiProperty({ description: '오프라인 여부' })
  isOffline: boolean;

  @ApiProperty({ description: '소셜링 장소' })
  @IsOptional()
  socialPlace?: SocialPlaceCreateRequestCommand;

  @ApiProperty({ description: '소셜링 시작 시간' })
  socialAt: Date;
}
