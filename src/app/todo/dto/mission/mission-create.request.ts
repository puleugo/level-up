import { ApiProperty } from '@nestjs/swagger';

import { MissionCreateRequestCommand } from '@app/todo/command/mission.command';
import { Team } from '@domain/team/team.entity';

export class MissionCreateRequest implements MissionCreateRequestCommand {
  @ApiProperty({ description: '미션 제목 ', example: '미션 제목' })
  title: string;

  @ApiProperty({
    description: '미션 설명',
    example: '미션에 대한 설명 데이터입니다.',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ description: '미션 시작일입니다.', example: new Date() })
  startedAt: Date;

  @ApiProperty({
    description: '미션 종료일입니다.',
    example: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  })
  endedAt: Date;

  @ApiProperty({
    example: [true, false, false, false, false, false, false],
    description: '반복 요일(월요일: 0)',
    type: [Boolean],
    isArray: true,
    minLength: 7,
    maxLength: 7,
  })
  repeatDay: boolean[];

  @ApiProperty({
    description: '팀 아이디',
    example: '1',
    nullable: true,
  })
  team: Team;
}
